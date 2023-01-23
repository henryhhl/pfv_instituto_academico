import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger('UsuarioService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listUsuario = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listUsuario, totalPagination] = await this.usuarioRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: { },
          order: { created_at: "DESC", },
        } );
      } else {
        [listUsuario, totalPagination] = await this.usuarioRepository.findAndCount( {
          where: { },
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayUsuario: listUsuario,
        pagination: {
          total: totalPagination,
        },
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

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

  async store(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { password, ...userData } = createUsuarioDto;
      const usuario = this.usuarioRepository.create( {
        ...userData,
        password: bcrypt.hashSync( password, 10 ),
        created_at: this.getDateTime(),
      } );
      await this.usuarioRepository.save( usuario );
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

  async findOne(idusuario: string) {
    try {
      const usuario = await this.usuarioRepository.findOne( {
        where: { idusuario: idusuario, },
        relations: { profile: true, },
      } );
      return usuario;
    } catch (error) {
      return null;
    }
  }

  async edit( idusuario: string ) {
    try {
      const usuario = await this.findOne(idusuario);
      if ( usuario ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          usuario: usuario,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Usuario no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idusuario: string ) {
    try {
      const usuario = await this.findOne(idusuario);
      if ( usuario ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          usuario: usuario,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Usuario no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idusuario: string, updateUsuarioDto: UpdateUsuarioDto ) {
    try {
      const usuario = await this.findOne(idusuario);
      if ( usuario === null ) {
        return {
          resp: 0, error: false,
          message: 'Usuario no existe.',
        };
      }
      const usuarioPreLoad = await this.usuarioRepository.preload( {
        idusuario: idusuario,
        ...updateUsuarioDto,
        password: bcrypt.hashSync( updateUsuarioDto.password, 10 ),
        concurrencia: usuario.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( usuarioPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Usuario no existe.',
        };
      }
      const usuarioUpdate = await this.usuarioRepository.save( usuarioPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Usuario actualizado éxitosamente.',
        usuario: usuario,
        usuarioUpdate: usuarioUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async updateProfile( profile: Profile ) {
    try {
      const usuarioPreLoad = await this.usuarioRepository.preload( {
        idusuario: profile.usuario.idusuario,
        nombreprincipal: profile.nombreprincipal ?? '',
        email: profile.email ?? '',
        profile: profile,
        updated_at: this.getDateTime(),
      } );

      if ( usuarioPreLoad === null ) {
        return null;
      }
      return await this.usuarioRepository.save( usuarioPreLoad );
    } catch (error) {
      return null;
    }
  }

  async delete(idusuario: string) {
    try {
      let usuario = await this.findOne(idusuario);
      if ( usuario === null ) {
        return {
          resp: 0, error: true,
          message: 'Usuario no existe.',
        };
      }
      await this.usuarioRepository.remove( usuario );
      return {
        resp: 1, error: false,
        message: 'Usuario eliminado éxitosamente.',
        usuario: usuario,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

}
