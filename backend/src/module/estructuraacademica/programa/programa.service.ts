
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { Programa } from './entities/programa.entity';

@Injectable()
export class ProgramaService {
  private listPrograma: Programa[] = [];

  findAll() {
    const listPrograma = this.listPrograma;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayPrograma: listPrograma,
    };
  }

  store(createProgramaDto: CreateProgramaDto) {
    let programa: Programa = {
      idprograma: uuid(),
      fkidunidadnegocio: createProgramaDto.fkidunidadnegocio,
      unidadnegocio: createProgramaDto.unidadnegocio,
      fkidunidadadministrativa: createProgramaDto.fkidunidadadministrativa,
      unidadadministrativa: createProgramaDto.unidadadministrativa,
      fkidunidadacademica: createProgramaDto.fkidunidadacademica,
      unidadacademica: createProgramaDto.unidadacademica,
      fkidnivelacademico: createProgramaDto.fkidnivelacademico,
      nivelacademico: createProgramaDto.nivelacademico,
      fkidmodalidadacademica: createProgramaDto.fkidmodalidadacademica,
      modalidadacademica: createProgramaDto.modalidadacademica,
      codigo: createProgramaDto.codigo,
      sigla: createProgramaDto.sigla,
      descripcion: createProgramaDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };
    this.listPrograma.push(programa);

    return {
      resp: 1,
      error: false,
      message: 'Programa registrado éxitosamente.',
      programa: programa,
    };
  }

  findOne(idprograma: String) {
    const programa = this.listPrograma.find( 
      (programa) => programa.idprograma === idprograma 
    );
    return programa;
  }

  edit(idprograma: string) {
    const programa = this.findOne(idprograma);
    if ( programa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          programa: programa,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Programa no existe.',
    };
  }

  show(idprograma: string) {
    const programa = this.findOne(idprograma);
    if ( programa ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            programa: programa,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Programa no existe.',
    };
  }

  update(id: String, updateProgramaDto: UpdateProgramaDto) {
    let programaDB = this.findOne(id);
    if ( programaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Programa no existe.',
      };
    }

    this.listPrograma = this.listPrograma.map( (programa) => {
      if ( programa.idprograma === id ) {
        programaDB.updated_at = '';
        programaDB = {
          ...programaDB,
          ...updateProgramaDto,
          idprograma: id,
          concurrencia: programa.concurrencia + 1,
        };
        return programaDB;
      }
      return programa;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Programa actualizado éxitosamente.',
      programa: programaDB,
    };
  }

  remove(id: string) {
    let programaDB = this.findOne(id);
    if ( programaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Programa no existe.',
      };
    }
    this.listPrograma = this.listPrograma.filter( 
      (programa) => programa.idprograma !== id 
    );
    return {
      resp: 1, error: false,
      message: 'Programa eliminado éxitosamente.',
      programa: programaDB,
    };
  }
}
