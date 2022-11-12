import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Usuario } from '../seguridad/usuario/entities/usuario.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUsuarioDto } from '../seguridad/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(Usuario)
    private readonly authRepository: Repository<Usuario>,
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
    try {

      const existUsuario = await this.authRepository.findOne( {
        where: { login: createUsuarioDto.login },
        select: { idusuario: true, login: true, email: true, estado: true, },
      } );
      if ( existUsuario !== null ) {
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
      return {
        resp: 1, error: false,
        message: 'Usuario registrado éxitosamente.',
        usuario: usuario,
      };
    } catch (error) {
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
        select: { idusuario: true, login: true, email: true, estado: true, },
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

      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        usuario: user,
      };

    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

}
