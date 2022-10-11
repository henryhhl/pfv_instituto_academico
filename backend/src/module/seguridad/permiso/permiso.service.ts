import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { Permiso } from './entities/permiso.entity';

@Injectable()
export class PermisoService {
  private listPermiso: Permiso[] = [];

  findAll() {
    const listPermiso = this.listPermiso;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayPermiso: listPermiso,
    };
  }

  store(createPermisoDto: CreatePermisoDto) {
    let permiso: Permiso = {
      idpermiso: uuid(),
      fkidtipopermiso: createPermisoDto.fkidtipopermiso,
      tipopermiso: createPermisoDto.tipopermiso,
      fkidpermisopadre: createPermisoDto.fkidpermisopadre,
      descripcion: createPermisoDto.descripcion,
      imagen: createPermisoDto.imagen,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };
    this.listPermiso.push(permiso);

    return {
      resp: 1,
      error: false,
      message: 'Permiso registrado éxitosamente.',
      permiso: permiso,
    };
  }

  findOne(idpermiso: string) {
    const permiso = this.listPermiso.find( (permiso) => permiso.idpermiso === idpermiso );
    return permiso;
  }

  edit(idpermiso: string) {
    const permiso = this.findOne(idpermiso);
    if ( permiso ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          permiso: permiso,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Permiso no existe.',
    };
  }

  show(idpermiso: string) {
    const permiso = this.findOne(idpermiso);
    if ( permiso ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            permiso: permiso,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Permiso no existe.',
    };
  }

  update(id: string, updatePermisoDto: UpdatePermisoDto) {
    let permisoDB = this.findOne(id);
    if ( permisoDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Permiso no existe.',
      };
    }

    this.listPermiso = this.listPermiso.map( (permiso) => {
      if ( permiso.idpermiso === id ) {
        permisoDB.updated_at = '';
        permisoDB = {
          ...permisoDB,
          ...updatePermisoDto,
          idpermiso: id,
          concurrencia: permiso.concurrencia + 1,
        };
        return permisoDB;
      }
      return permiso;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Permiso actualizado éxitosamente.',
      permiso: permisoDB,
    };
  }

  remove(id: string) {
    let permispoDB = this.findOne(id);
    if ( permispoDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Permiso no existe.',
      };
    }
    this.listPermiso = this.listPermiso.filter( (permiso) => permiso.idpermiso !== id );
    return {
      resp: 1, error: false,
      message: 'Permiso eliminado éxitosamente.',
      permiso: permispoDB,
    };
  }
}
