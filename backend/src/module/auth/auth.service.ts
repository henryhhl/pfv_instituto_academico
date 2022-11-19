import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Usuario } from '../seguridad/usuario/entities/usuario.entity';
import { CreateUsuarioDto } from '../seguridad/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(Usuario)
    private readonly authRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,

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

  async register(createUsuarioDto: CreateUsuarioDto) {
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

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { password, login } = loginAuthDto;
      const user = await this.authRepository.findOne( {
        where: { login },
        select: { idusuario: true, login: true, email: true, estado: true, password: true, },
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
