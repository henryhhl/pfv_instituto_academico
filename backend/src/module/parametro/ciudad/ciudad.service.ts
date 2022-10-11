import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadService {

  private listCiudad: Ciudad[] = [];

  findAll() {
    const listCiudad = this.listCiudad;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayCiudad: listCiudad,
    };
  }

  store(createCiudadDto: CreateCiudadDto) {
    let ciudad: Ciudad = {
      idciudad: uuid(),
      fkidciudadpadre: createCiudadDto.fkidciudadpadre,
      sigla: createCiudadDto.sigla,
      descripcion: createCiudadDto.descripcion,
      imagen: createCiudadDto.imagen,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listCiudad.push(ciudad);

    return {
      resp: 1,
      error: false,
      message: 'Ciudad registrado éxitosamente.',
      ciudad: ciudad,
    };
  }

  findOne(idciudad: string) {
    const ciudad = this.listCiudad.find( (ciudad) => ciudad.idciudad === idciudad );
    return ciudad;
  }

  edit(idciudad: string) {
    const ciudad = this.findOne(idciudad);
    if ( ciudad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          ciudad: ciudad,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Ciudad no existe.',
    };
  }

  show(idciudad: string) {
    const ciudad = this.findOne(idciudad);
    if ( ciudad ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            ciudad: ciudad,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Ciudad no existe.',
    };
  }

  update(id: string, updateCiudadDto: UpdateCiudadDto) {
    let ciudadDB = this.findOne(id);
    if ( ciudadDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Ciudad no existe.',
      };
    }

    this.listCiudad = this.listCiudad.map( (ciudad) => {
      if ( ciudad.idciudad === id ) {
        ciudadDB.updated_at = '';
        ciudadDB = {
          ...ciudadDB,
          ...updateCiudadDto,
          idciudad: id,
          concurrencia: ciudad.concurrencia + 1,
        };
        return ciudadDB;
      }
      return ciudad;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Ciudad actualizado éxitosamente.',
      ciudad: ciudadDB,
    };
  }

  delete(id: string) {
    let ciudadDB = this.findOne(id);
    if ( ciudadDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Ciudad no existe.',
      };
    }
    this.listCiudad = this.listCiudad.filter( (ciudad) => ciudad.idciudad !== id );
    return {
      resp: 1, error: false,
      message: 'Ciudad eliminado éxitosamente.',
      ciudad: ciudadDB,
    };
  }
}
