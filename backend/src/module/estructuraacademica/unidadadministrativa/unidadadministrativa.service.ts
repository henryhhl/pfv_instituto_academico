import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUnidadAdministrativaDto } from './dto/create-unidadadministrativa.dto';
import { UpdateUnidadAdministrativaDto } from './dto/update-unidadadministrativa.dto';
import { UnidadAdministrativa } from './entities/unidadadministrativa.entity';

@Injectable()
export class UnidadAdministrativaService {
  private listUnidadAdministrativa: UnidadAdministrativa[] = [];

  findAll() {
    const listUnidadAdministrativa = this.listUnidadAdministrativa;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayUnidadAdministrativa: listUnidadAdministrativa,
    };
  }

  store(createUnidadadministrativaDto: CreateUnidadAdministrativaDto) {
    let unidadAdministrativa: UnidadAdministrativa = {
      idunidadadministrativa: uuid(),
      fkidunidadnegocio: createUnidadadministrativaDto.fkidunidadnegocio,
      unidadnegocio: createUnidadadministrativaDto.unidadnegocio,
      sigla: createUnidadadministrativaDto.sigla,
      descripcion: createUnidadadministrativaDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };
    this.listUnidadAdministrativa.push(unidadAdministrativa);

    return {
      resp: 1,
      error: false,
      message: 'Unidad Administrativa registrado éxitosamente.',
      unidadAdministrativa: unidadAdministrativa,
    };
  }

  findOne(idunidadadministrativa: String) {
    const unidadadministrativa = this.listUnidadAdministrativa.find( 
      (unidadadministrativa) => unidadadministrativa.idunidadadministrativa === idunidadadministrativa 
    );
    return unidadadministrativa;
  }

  edit(idunidadadministrativa: string) {
    const unidadAdministrativa = this.findOne(idunidadadministrativa);
    if ( unidadAdministrativa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          unidadAdministrativa: unidadAdministrativa,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Unidad Administrativa no existe.',
    };
  }

  show(idunidadadministrativa: string) {
    const unidadAdministrativa = this.findOne(idunidadadministrativa);
    if ( unidadAdministrativa ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            unidadAdministrativa: unidadAdministrativa,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Unidad Administrativa no existe.',
    };
  }

  update(id: String, updateUnidadadministrativaDto: UpdateUnidadAdministrativaDto) {
    let unidadAdministrativaDB = this.findOne(id);
    if ( unidadAdministrativaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Administrativa no existe.',
      };
    }

    this.listUnidadAdministrativa = this.listUnidadAdministrativa.map( (unidadAdministrativa) => {
      if ( unidadAdministrativa.idunidadadministrativa === id ) {
        unidadAdministrativaDB.updated_at = '';
        unidadAdministrativaDB = {
          ...unidadAdministrativaDB,
          ...updateUnidadadministrativaDto,
          idunidadadministrativa: id,
          concurrencia: unidadAdministrativa.concurrencia + 1,
        };
        return unidadAdministrativaDB;
      }
      return unidadAdministrativa;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Unidad Administrativa actualizado éxitosamente.',
      unidadAdministrativa: unidadAdministrativaDB,
    };
  }

  remove(id: String) {
    let unidadAdministrativaDB = this.findOne(id);
    if ( unidadAdministrativaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Administrativa no existe.',
      };
    }
    this.listUnidadAdministrativa = this.listUnidadAdministrativa.filter( 
      (unidadAdministrativa) => unidadAdministrativa.idunidadadministrativa !== id 
    );
    return {
      resp: 1, error: false,
      message: 'Unidad Administrativa eliminado éxitosamente.',
      unidadAdministrativa: unidadAdministrativaDB,
    };
  }
}
