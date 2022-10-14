import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUsuarioRolDetalleDto } from './dto/create-usuarioroldetalle.dto';
import { UpdateUsuarioroldetalleDto } from './dto/update-usuarioroldetalle.dto';
import { UsuarioRolDetalle } from './entities/usuarioroldetalle.entity';
import { RolService } from '../../../rol/rol.service';
import { UsuarioService } from '../../../usuario/usuario.service';

@Injectable()
export class UsuarioRolDetalleService {
  private listUsuarioRolDetalle: UsuarioRolDetalle[] = [];

  constructor(
    private readonly rolService: RolService,
    private readonly usuarioService: UsuarioService,
  ) {}

  findAll() {
    const listUsuarioRolDetalle = this.listUsuarioRolDetalle;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayUsuarioRolDetalle: listUsuarioRolDetalle,
    };
  }

  rolUsuario(idusuario: String) {
    let listRol = this.listUsuarioRolDetalle.filter( 
        (usuariorol) => usuariorol.fkidusuario === idusuario 
     );
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayRol: listRol,
    };
  }

  store(createUsuarioroldetalleDto: CreateUsuarioRolDetalleDto) {
    let usuarioroldetalle: UsuarioRolDetalle = {
      idusuarioroldetalle: uuid(),
      fkidusuario: createUsuarioroldetalleDto.fkidusuario,
      fkidrol: createUsuarioroldetalleDto.fkidrol,
      rol: createUsuarioroldetalleDto.rol,
      tiporol: createUsuarioroldetalleDto.tiporol,
      notarol: createUsuarioroldetalleDto.notarol,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };
    this.listUsuarioRolDetalle.push(usuarioroldetalle);

    return {
      resp: 1,
      error: false,
      message: 'Rol asignador éxitosamente.',
      usuarioroldetalle: usuarioroldetalle,
    };
  }

  findOne(idusuarioroldetalle: String) {
    const usuarioroldetalle = this.listUsuarioRolDetalle.find( 
      (usuarioroldetalle) => usuarioroldetalle.idusuarioroldetalle === idusuarioroldetalle 
    );
    return usuarioroldetalle;
  }

  update(id: number, updateUsuarioroldetalleDto: UpdateUsuarioroldetalleDto) {
    return `This action updates a #${id} usuarioroldetalle`;
  }

  delete(idusuarioroldetalle: String) {
    let usuarioroldetalleDB = this.findOne(idusuarioroldetalle);
    if ( usuarioroldetalleDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Rol Asignado no existe.',
      };
    }
    this.listUsuarioRolDetalle = this.listUsuarioRolDetalle.filter( 
      (permiso) => permiso.idusuarioroldetalle !== idusuarioroldetalle 
    );
    return {
      resp: 1, error: false,
      message: 'Rol Asignado eliminado éxitosamente.',
      permiso: usuarioroldetalleDB,
      arrayUsuarioRolDetalle: this.listUsuarioRolDetalle,
    };
  }
}
