import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {

  private listUsuario: Usuario[] = [];

  create(createUsuarioDto: CreateUsuarioDto) {
    let usuario: Usuario = {
      idusuario: uuid(),
      email: createUsuarioDto.email,
      login: createUsuarioDto.login,
      password: createUsuarioDto.password,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listUsuario.push(usuario);

    return {
      resp: 1,
      error: false,
      message: 'Usuario registrado éxitosamente.',
      usuario: usuario,
    };
  }

  findAll() {
    const listUsuario = this.listUsuario;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayUsuario: listUsuario,
    };
  }

  findOne(idusuario: string) {
    const usuario = this.listUsuario.find( (usuario) => usuario.idusuario === idusuario );
    // if ( !usuario ) {
    //   throw new NotFoundException('Tipo Materia with id not found');
    // }
    return usuario;
  }

  editUsuario( idusuario: string ) {
    const usuario = this.listUsuario.find( usuario => usuario.idusuario === idusuario );
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
  }

  showUsuario( idusuario: string ) {
      const usuario = this.listUsuario.find( usuario => usuario.idusuario === idusuario );
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
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    let usuarioDB = this.findOne(id);
    if ( usuarioDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Usuario no existe.',
      };
    }

    this.listUsuario = this.listUsuario.map( (usuario) => {
      if ( usuario.idusuario === id ) {
        usuarioDB.updated_at = '';
        usuarioDB = {
          ...usuarioDB,
          ...updateUsuarioDto,
          idusuario: id,
          concurrencia: usuario.concurrencia + 1,
        };
        return usuarioDB;
      }
      return usuario;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Usuario actualizado éxitosamente.',
      tipoRol: usuarioDB,
    };
  }

  remove(id: string) {
    let usuario = this.findOne(id);
    if ( usuario === null ) {
      return {
        resp: 0, error: false,
        message: 'Usuario no existe.',
      };
    }
    this.listUsuario = this.listUsuario.filter( (usuario) => usuario.idusuario !== id );
    return {
      resp: 1, error: false,
      message: 'Usuario eliminado éxitosamente.',
      usuario: usuario,
    };
  }

  fillUsuarioSeedData( listUsuario: Usuario[] ) {
    this.listUsuario = listUsuario;
  }

}
