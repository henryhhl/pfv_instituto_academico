import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { Responsable } from './entities/responsable.entity';

@Injectable()
export class ResponsableService {
  private listResponsable: Responsable[] = [];

  findAll() {
    const listResponsable = this.listResponsable;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayResponsable: listResponsable,
    };
  }

  store(createResponsableDto: CreateResponsableDto) {
    let responsable: Responsable = {
      idresponsable: uuid(),
      codigo: createResponsableDto.codigo,
      nrodocumento: createResponsableDto.nrodocumento,
      nombre: createResponsableDto.nombre,
      apellido: createResponsableDto.apellido,
      ciudad: createResponsableDto.ciudad,
      direccion: createResponsableDto.direccion,
      genero: createResponsableDto.genero,
      fechanacimiento: createResponsableDto.fechanacimiento,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };
    this.listResponsable.push(responsable);

    return {
      resp: 1,
      error: false,
      message: 'Responsable registrado éxitosamente.',
      responsable: responsable,
    };
  }

  findOne(idresponsable: string) {
    const responsable = this.listResponsable.find( 
      (responsable) => responsable.idresponsable === idresponsable 
    );
    return responsable;
  }

  edit(idresponsable: string) {
    const responsable = this.findOne(idresponsable);
    if ( responsable ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          responsable: responsable,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Responsable no existe.',
    };
  }

  show(idresponsable: string) {
    const responsable = this.findOne(idresponsable);
    if ( responsable ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            responsable: responsable,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Responsable no existe.',
    };
  }

  update(id: string, updateResponsableDto: UpdateResponsableDto) {
    let responsableDB = this.findOne(id);
    if ( responsableDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Responsable no existe.',
      };
    }

    this.listResponsable = this.listResponsable.map( (responsable) => {
      if ( responsable.idresponsable === id ) {
        responsableDB.updated_at = '';
        responsableDB = {
          ...responsableDB,
          ...updateResponsableDto,
          idresponsable: id,
          concurrencia: responsable.concurrencia + 1,
        };
        return responsableDB;
      }
      return responsable;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Responsable actualizado éxitosamente.',
      responsable: responsableDB,
    };
  }

  remove(id: string) {
    let responsableDB = this.findOne(id);
    if ( responsableDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Responsable no existe.',
      };
    }
    this.listResponsable = this.listResponsable.filter( 
      (responsable) => responsable.idresponsable !== id 
    );
    return {
      resp: 1, error: false,
      message: 'Responsable eliminado éxitosamente.',
      responsable: responsableDB,
    };
  }
}
