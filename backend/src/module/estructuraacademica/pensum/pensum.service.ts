import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreatePensumDto } from './dto/create-pensum.dto';
import { UpdatePensumDto } from './dto/update-pensum.dto';
import { Pensum } from './entities/pensum.entity';

@Injectable()
export class PensumService {
  private listPensum: Pensum[] = [];

  findAll() {
    const listPensum = this.listPensum;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayPensum: listPensum,
    };
  }

  store(createPensumDto: CreatePensumDto) {
    let pensum: Pensum = {
      idpensum: uuid(),
      fkidunidadnegocio: createPensumDto.fkidunidadnegocio,
      unidadnegocio: createPensumDto.unidadnegocio,
      fkidunidadadministrativa: createPensumDto.fkidunidadadministrativa,
      unidadadministrativa: createPensumDto.unidadadministrativa,
      fkidunidadacademica: createPensumDto.fkidunidadacademica,
      unidadacademica: createPensumDto.unidadacademica,
      fkidprograma: createPensumDto.fkidprograma,
      programa: createPensumDto.programa,
      descripcion: createPensumDto.descripcion,
      fechaaprobacion: createPensumDto.fechaaprobacion,
      estadoproceso: createPensumDto.estadoproceso,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };
    this.listPensum.push(pensum);

    return {
      resp: 1,
      error: false,
      message: 'Pensum registrado éxitosamente.',
      pensum: pensum,
    };
  }

  findOne(idpensum: string) {
    const pensum = this.listPensum.find( 
      (pensum) => pensum.idpensum === idpensum 
    );
    return pensum;
  }

  edit(idpensum: string) {
    const pensum = this.findOne(idpensum);
    if ( pensum ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          pensum: pensum,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Pensum no existe.',
    };
  }

  show(idpensum: string) {
    const pensum = this.findOne(idpensum);
    if ( pensum ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            pensum: pensum,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Pensum no existe.',
    };
  }

  update(id: string, updatePensumDto: UpdatePensumDto) {
    let pensumDB = this.findOne(id);
    if ( pensumDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Pensum no existe.',
      };
    }

    this.listPensum = this.listPensum.map( (pensum) => {
      if ( pensum.idpensum === id ) {
        pensumDB.updated_at = '';
        pensumDB = {
          ...pensumDB,
          ...updatePensumDto,
          idpensum: id,
          concurrencia: pensum.concurrencia + 1,
        };
        return pensumDB;
      }
      return pensum;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Pensum actualizado éxitosamente.',
      pensum: pensumDB,
    };
  }

  remove(id: string) {
    let pensumDB = this.findOne(id);
    if ( pensumDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Pensum no existe.',
      };
    }
    this.listPensum = this.listPensum.filter( 
      (pensum) => pensum.idpensum !== id 
    );
    return {
      resp: 1, error: false,
      message: 'Pensum eliminado éxitosamente.',
      pensum: pensumDB,
    };
  }
}
