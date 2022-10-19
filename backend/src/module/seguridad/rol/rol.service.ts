
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {

  private listRol: Rol[] = [];

  findAll() {
    const listRol = this.listRol;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayRol: listRol,
    };
  }

  store(createRolDto: CreateRolDto) {
    let rol: Rol = {
      idrol: uuid(),
      fkidtiporol: createRolDto.fkidtiporol,
      tiporol: createRolDto.tiporol,
      descripcion: createRolDto.descripcion,
      nota: createRolDto.nota,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listRol.push(rol);

    return {
      resp: 1,
      error: false,
      message: 'Rol registrado éxitosamente.',
      rol: rol,
    };
  }

  findOne(idrol: string) {
    const rol = this.listRol.find( (rol) => rol.idrol === idrol );
    return rol;
  }

  editRol( idrol: string ) {
    const rol = this.listRol.find( rol => rol.idrol === idrol );
    if ( rol ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            rol: rol,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Rol no existe.',
    };
  }

  showRol( idrol: string ) {
      const rol = this.listRol.find( rol => rol.idrol === idrol );
      if ( rol ) {
          return {
              resp: 1, error: false,
              message: 'Servicio realizado exitosamente.',
              rol: rol,
          };
      }
      return {
          resp: 0, error: false,
          message: 'Rol no existe.',
      };
  }

  update(id: string, updateRolDto: UpdateRolDto) {
    let rolDB = this.findOne(id);
    if ( rolDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Rol no existe.',
      };
    }

    this.listRol = this.listRol.map( (rol) => {
      if ( rol.idrol === id ) {
        rolDB.updated_at = '';
        rolDB = {
          ...rolDB,
          ...updateRolDto,
          idrol: id,
          concurrencia: rol.concurrencia + 1,
        };
        return rolDB;
      }
      return rol;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Rol actualizado éxitosamente.',
      rol: rolDB,
    };
  }

  remove(id: string) {
    let rolDB = this.findOne(id);
    if ( rolDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Rol no existe.',
      };
    }
    this.listRol = this.listRol.filter( (rol) => rol.idrol !== id );
    return {
      resp: 1, error: false,
      message: 'Rol eliminado éxitosamente.',
      usuario: rolDB,
    };
  }

  fillRolSeedData( listRol: Rol[] ) {
    this.listRol = listRol;
  }

}
