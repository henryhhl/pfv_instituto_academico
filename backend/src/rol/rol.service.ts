
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {

  private listRol: Rol[] = [];

  create(createRolDto: CreateRolDto) {
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

    return rol;
  }

  findAll() {
    return this.listRol;
  }

  findOne(idrol: string) {
    const rol = this.listRol.find( (rol) => rol.idrol === idrol );
    if ( !rol ) {
      throw new NotFoundException('Tipo Materia with id not found');
    }
    return rol;
  }

  update(id: string, updateRolDto: UpdateRolDto) {
    let rolDB = this.findOne(id);

    this.listRol = this.listRol.map( (rol) => {
      if ( rol.idrol === id ) {
        rolDB.updated_at = '';
        rolDB = {
          ...rolDB,
          ...updateRolDto,
          idrol: id,
        };
        return rolDB;
      }
      return rol;
    } );
    return rolDB;
  }

  remove(id: string) {
    this.listRol = this.listRol.filter( (rol) => rol.idrol !== id );
  }

  fillRolSeedData( listRol: Rol[] ) {
    this.listRol = listRol;
  }

}
