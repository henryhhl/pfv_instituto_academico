import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUnidadAcademicaDto } from './dto/create-unidadacademica.dto';
import { UpdateUnidadAcademicaDto } from './dto/update-unidadacademica.dto';
import { UnidadAcademica } from './entities/unidadacademica.entity';

@Injectable()
export class UnidadacademicaService {
  private listUnidadAcademica: UnidadAcademica[] = [];

  findAll() {
    const listUnidadAcademica = this.listUnidadAcademica;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayUnidadAcademica: listUnidadAcademica,
    };
  }

  create(createUnidadacademicaDto: CreateUnidadAcademicaDto) {
    let unidadAcademica: UnidadAcademica = {
      idunidadacademica: uuid(),
      fkidunidadnegocio: createUnidadacademicaDto.fkidunidadnegocio,
      unidadnegocio: createUnidadacademicaDto.unidadnegocio,
      fkidunidadadministrativa: createUnidadacademicaDto.fkidunidadadministrativa,
      unidadadministrativa: createUnidadacademicaDto.unidadadministrativa,
      codigo: createUnidadacademicaDto.codigo,
      sigla: createUnidadacademicaDto.sigla,
      descripcion: createUnidadacademicaDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };
    this.listUnidadAcademica.push(unidadAcademica);

    return {
      resp: 1,
      error: false,
      message: 'Unidad Academica registrado éxitosamente.',
      unidadAcademica: unidadAcademica,
    };
  }

  findOne(idunidadacademica: String) {
    const unidadAcademica = this.listUnidadAcademica.find( 
      (unidadAcademica) => unidadAcademica.idunidadacademica === idunidadacademica 
    );
    return unidadAcademica;
  }

  edit(idunidadacademica: string) {
    const unidadAcademica = this.findOne(idunidadacademica);
    if ( unidadAcademica ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          unidadAcademica: unidadAcademica,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Unidad Academica no existe.',
    };
  }

  show(idunidadacademica: string) {
    const unidadAcademica = this.findOne(idunidadacademica);
    if ( unidadAcademica ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            unidadAcademica: unidadAcademica,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Unidad Academica no existe.',
    };
  }

  update(id: String, updateUnidadacademicaDto: UpdateUnidadAcademicaDto) {
    let unidadAcademicaDB = this.findOne(id);
    if ( unidadAcademicaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Academica no existe.',
      };
    }

    this.listUnidadAcademica = this.listUnidadAcademica.map( (unidadAcademica) => {
      if ( unidadAcademica.idunidadacademica === id ) {
        unidadAcademicaDB.updated_at = '';
        unidadAcademicaDB = {
          ...unidadAcademicaDB,
          ...updateUnidadacademicaDto,
          idunidadacademica: id,
          concurrencia: unidadAcademica.concurrencia + 1,
        };
        return unidadAcademicaDB;
      }
      return unidadAcademica;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Unidad Academica actualizado éxitosamente.',
      unidadAcademica: unidadAcademicaDB,
    };
  }

  remove(id: String) {
    let unidadAcademicaDB = this.findOne(id);
    if ( unidadAcademicaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Academica no existe.',
      };
    }
    this.listUnidadAcademica = this.listUnidadAcademica.filter( 
      (unidadAcademica) => unidadAcademica.idunidadacademica !== id 
    );
    return {
      resp: 1, error: false,
      message: 'Unidad Academica eliminado éxitosamente.',
      unidadAcademica: unidadAcademicaDB,
    };
  }
}
