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

    return usuario;
  }

  findAll() {
    return this.listUsuario;
  }

  findOne(idusuario: string) {
    const usuario = this.listUsuario.find( (usuario) => usuario.idusuario === idusuario );
    if ( !usuario ) {
      throw new NotFoundException('Tipo Materia with id not found');
    }
    return usuario;
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    let usuarioDB = this.findOne(id);

    this.listUsuario = this.listUsuario.map( (usuario) => {
      if ( usuario.idusuario === id ) {
        usuarioDB.updated_at = '';
        usuarioDB = {
          ...usuarioDB,
          ...updateUsuarioDto,
          idusuario: id,
        };
        return usuarioDB;
      }
      return usuario;
    } );
    return usuarioDB;
  }

  remove(id: string) {
    this.listUsuario = this.listUsuario.filter( (usuario) => usuario.idusuario !== id );
  }

  fillUsuarioSeedData( listUsuario: Usuario[] ) {
    this.listUsuario = listUsuario;
  }

}
