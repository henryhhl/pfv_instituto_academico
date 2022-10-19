import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUnidadnegocioDto } from './dto/create-unidadnegocio.dto';
import { UpdateUnidadNegocioDto } from './dto/update-unidadnegocio.dto';
import { UnidadNegocio } from './entities/unidadnegocio.entity';

@Injectable()
export class UnidadNegocioService {

  private listUnidadNegocio: UnidadNegocio[] = [];

  findAll() {
    const listUnidadNegocio = this.listUnidadNegocio;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayUnidadNegocio: listUnidadNegocio,
    };
  }

  store(createUnidadnegocioDto: CreateUnidadnegocioDto) {
    let unidadnegocio: UnidadNegocio = {
      idunidadnegocio: uuid(),
      sigla: createUnidadnegocioDto.sigla,
      descripcion: createUnidadnegocioDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listUnidadNegocio.push(unidadnegocio);

    return {
      resp: 1,
      error: false,
      message: 'Unidad Negocio registrado éxitosamente.',
      unidadNegocio: unidadnegocio,
    };
  }

  edit( idunidadnegocio: string ) {
    const unidadNegocio = this.findOne(idunidadnegocio);
    if ( unidadNegocio ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            unidadNegocio: unidadNegocio,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Unidad Negocio no existe.',
    };
  }

  show( idunidadnegocio: string ) {
    const unidadNegocio = this.findOne(idunidadnegocio);
    if ( unidadNegocio ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            unidadNegocio: unidadNegocio,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Unidad Negocio no existe.',
    };
  }

  findOne(idunidadnegocio: string) {
    const unidadNegocio = this.listUnidadNegocio.find( (unidadNegocio) => unidadNegocio.idunidadnegocio === idunidadnegocio );
    return unidadNegocio;
  }

  update(id: string, updateUnidadNegocioDto: UpdateUnidadNegocioDto) {
    let unidadNegocioDB = this.findOne(id);
    if ( unidadNegocioDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Negocio no existe.',
      };
    }

    this.listUnidadNegocio = this.listUnidadNegocio.map( (unidadNegocio) => {
      if ( unidadNegocio.idunidadnegocio === id ) {
        unidadNegocioDB.updated_at = '';
        unidadNegocioDB = {
          ...unidadNegocioDB,
          ...updateUnidadNegocioDto,
          idunidadnegocio: id,
          concurrencia: unidadNegocio.concurrencia + 1,
        };
        return unidadNegocioDB;
      }
      return unidadNegocio;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Unidad Negocio actualizado éxitosamente.',
      unidadNegocio: unidadNegocioDB,
    };
  }

  remove(id: string) {
    let unidadNegocioDB = this.findOne(id);
    if ( unidadNegocioDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Negocio no existe.',
      };
    }
    this.listUnidadNegocio = this.listUnidadNegocio.filter( (unidadNegocio) => unidadNegocio.idunidadnegocio !== id );
    return {
      resp: 1, error: false,
      message: 'Unidad Negocio eliminado éxitosamente.',
      unidadNegocio: unidadNegocioDB,
    };
  }
}
