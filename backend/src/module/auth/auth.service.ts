import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Usuario } from '../seguridad/usuario/entities/usuario.entity';
import { BitacoraService } from '../seguridad/bitacora/bitacora.service';
import { CreateUsuarioDto } from '../seguridad/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(Usuario)
    private readonly authRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,
    private readonly bitacoraService: BitacoraService,

    private readonly dataSource: DataSource,
  ) {}

  private getDateTime() {
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear().toString();
    
    month = (+month < 10) ? "0" + month : month;
    day = (+day < 10) ? "0" + day : day;

    let hour = date.getHours().toString();
    let minutes  = date.getMinutes().toString();
    let segundos = date.getSeconds().toString();
    let milliSeconds = date.getMilliseconds().toString();

    hour = (+hour < 10) ? "0" + hour : hour;
    minutes = (+minutes < 10) ? "0" + minutes : minutes;
    segundos = (+segundos < 10) ? "0" + segundos : segundos;

    return `${year}-${month}-${day} ${hour}:${minutes}:${segundos}:${milliSeconds}`;
  }

  async register(createUsuarioDto: CreateUsuarioDto, request) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const existUsuario = await this.authRepository.findOne( {
        where: { login: createUsuarioDto.login },
        select: { idusuario: true, login: true, email: true, estado: true, },
      } );
      if ( existUsuario !== null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Usuario ya existe, favor de ingresar con otro Usuario.',
        };
      }

      const { password, ...userData } = createUsuarioDto;
      const usuario = this.authRepository.create( {
        ...userData,
        password: bcrypt.hashSync( password, 10 ),
        created_at: this.getDateTime(),
      } );

      await this.authRepository.save( usuario );

      const token = this.getJwtToken( { idusuario: usuario.idusuario, } );

      const usuarioPreLoad = await this.authRepository.preload( {
        idusuario: usuario.idusuario,
        web_token: token,
        api_token: token,
        online: 'A',
      } );

      await this.bitacoraService.store( {
        usuario: usuarioPreLoad,
        fkidtabla: usuarioPreLoad.idusuario,
        tabla: 'usuario',
        accion: 'Registro de Usuario',
        descripcion: `Se realizo con éxito al iniciar sesion y registro de usuario`,
        event: 'register',
        ip: request.ip, uri: request.originalUrl,
        x_fecha: request.body.x_fecha, x_hora: request.body.x_hora,
      } );

      const usuarioUpdate = await queryRunner.manager.save( usuarioPreLoad );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      const { 
        api_token, movil_token, web_token, concurrencia, isdelete,
        created_at, updated_at, deleted_at, ...usuarioRespta 
      } = usuarioUpdate;

      return {
        resp: 1, error: false,
        message: 'Usuario registrado éxitosamente.',
        usuario: usuarioRespta,
        token: token,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async login(loginAuthDto: LoginAuthDto, request) {
    try {
      const { password, login } = loginAuthDto;
      const user = await this.authRepository.findOne( {
        relations: {
          arrayrol: true,
        },
        where: { login },
        select: { 
          idusuario: true, login: true, email: true, estado: true, password: true, 
          arrayrol: {
            idasignarrol: true,
            estado: true,
            rol: {
              idrol: true,
              descripcion: true,
              nota: true,
              estado: true,
            }
          },
        },
      } );

      if ( user === null ) {
        return {
          resp: 0, error: false,
          message: 'Credenciales incorrecto.',
        };
      }

      if ( !bcrypt.compareSync( password, user.password ) ) {
        return {
          resp: 0, error: false,
          message: 'Contraseña incorrecto.',
        };
      }

      const token = this.getJwtToken( { idusuario: user.idusuario, } );
      const usuarioPreLoad = await this.authRepository.preload( {
        idusuario: user.idusuario,
        web_token: token,
        api_token: token,
        intentos: 0,
        online: 'A',
      } );

      await this.bitacoraService.store( {
        usuario: usuarioPreLoad,
        fkidtabla: usuarioPreLoad.idusuario,
        tabla: 'usuario',
        accion: 'Inicio de sesion',
        descripcion: `Se realizo con éxito al iniciar sesion`,
        event: 'login',
        ip: request.ip, uri: request.originalUrl,
        x_fecha: loginAuthDto.x_fecha, x_hora: loginAuthDto.x_hora,
      } );

      const usuarioUpdate = await this.authRepository.save( usuarioPreLoad );

      const { 
        api_token, movil_token, web_token, concurrencia, isdelete,
        created_at, updated_at, deleted_at, ...usuarioRespta 
      } = usuarioUpdate;

      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        usuario: usuarioRespta,
        token: token,
        arrayRol: user.arrayrol,
      };

    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idusuario: string) {
    try {
      const usuarioFirst = await this.authRepository.findOneBy( {
        idusuario,
      } );
      return usuarioFirst;
    } catch (error) {
      return null;
    }
  }

  async logout(request) {
    try {
      const userFirst = await this.findOne(request.body.idusuario);

      if ( userFirst === null ) {
        return {
          resp: 0, error: false,
          message: 'Usuario no existente.',
        };
      }

      const usuarioPreLoad = await this.authRepository.preload( {
        idusuario: userFirst.idusuario,
        web_token: null,
        api_token: null,
        online: 'N',
      } );

      await this.bitacoraService.store( {
        usuario: usuarioPreLoad,
        fkidtabla: usuarioPreLoad.idusuario,
        tabla: 'usuario',
        accion: 'Cerró sesion',
        descripcion: `Se realizo con éxito al cerrar sesion`,
        event: 'logout',
        ip: request.ip, uri: request.originalUrl,
        x_fecha: request.body.x_fecha, x_hora: request.body.x_hora,
      } );

      await this.authRepository.save( usuarioPreLoad );

      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
      };

    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async checkAuthToken(user: Usuario) {
    try {
      const token = this.getJwtToken( { idusuario: user.idusuario, } );
      const usuarioPreLoad = await this.authRepository.preload( {
        idusuario: user.idusuario,
        web_token: token,
        api_token: token,
      } );
      await this.authRepository.save( usuarioPreLoad );
      const { 
        api_token, movil_token, web_token, concurrencia, isdelete, password,
        intentos, timeout, created_at, updated_at, deleted_at, ...usuarioRespta 
      } = user;

      const userFirst = await this.authRepository.findOne( {
        relations: {
          arrayrol: {
            rol: true,
          },
        },
        where: { idusuario: user.idusuario },
        select: { 
          idusuario: true, login: true, email: true, estado: true, password: true, 
          arrayrol: {
            idasignarrol: true,
            estado: true,
            rol: {
              idrol: true,
              descripcion: true,
              nota: true,
              estado: true,
            }
          },
        },
      } );

      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        usuario: usuarioRespta,
        token: token,
        arrayRol: userFirst.arrayrol,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;
  }

}
