import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateModalidadAcademicaDto } from './dto/create-modalidadacademica.dto';
import { UpdateModalidadAcademicaDto } from './dto/update-modalidadacademica.dto';
import { ModalidadAcademica } from './entities/modalidadacademica.entity';

@Injectable()
export class ModalidadAcademicaService {

  private listModalidadAcademica: ModalidadAcademica[] = [];

  findAll() {
    const listModalidadAcademica = this.listModalidadAcademica;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayModalidadAcademica: listModalidadAcademica,
    };
  }

  store(createModalidadAcademicaDto: CreateModalidadAcademicaDto) {
    let modalidadAcademica: ModalidadAcademica = {
      idmodalidadacademica: uuid(),
      sigla: createModalidadAcademicaDto.sigla,
      descripcion: createModalidadAcademicaDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listModalidadAcademica.push(modalidadAcademica);

    return {
      resp: 1,
      error: false,
      message: 'Modalidad Academica registrado éxitosamente.',
      modalidadAcademica: modalidadAcademica,
    };
  }

  findOne(idmodalidadacademica: string) {
    const modalidadAcademica = this.listModalidadAcademica.find( (modalidadAcademica) => modalidadAcademica.idmodalidadacademica === idmodalidadacademica );
    return modalidadAcademica;
  }

  edit( idmodalidadacademica: string ) {
    const modalidadAcademica = this.findOne(idmodalidadacademica);
    if ( modalidadAcademica ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            modalidadAcademica: modalidadAcademica,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Modalidad Academica no existe.',
    };
  }

  show( idmodalidadacademica: string ) {
    const modalidadAcademica = this.findOne(idmodalidadacademica);
    if ( modalidadAcademica ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            modalidadAcademica: modalidadAcademica,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Modalidad Academica no existe.',
    };
  }

  update(id: string, updateModalidadAcademicaDto: UpdateModalidadAcademicaDto) {
    let modalidadAcademicaDB = this.findOne(id);
    if ( modalidadAcademicaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Modalidad Academica no existe.',
      };
    }

    this.listModalidadAcademica = this.listModalidadAcademica.map( (modalidadAcademica) => {
      if ( modalidadAcademica.idmodalidadacademica === id ) {
        modalidadAcademicaDB.updated_at = '';
        modalidadAcademicaDB = {
          ...modalidadAcademicaDB,
          ...updateModalidadAcademicaDto,
          idmodalidadacademica: id,
          concurrencia: modalidadAcademica.concurrencia + 1,
        };
        return modalidadAcademicaDB;
      }
      return modalidadAcademica;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Modalidad Academica actualizado éxitosamente.',
      modalidadAcademica: modalidadAcademicaDB,
    };
  }

  remove(id: string) {
    let modalidadAcademicaDB = this.findOne(id);
    if ( modalidadAcademicaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Modalidad Academica no existe.',
      };
    }
    this.listModalidadAcademica = this.listModalidadAcademica.filter( (modalidadAcademica) => modalidadAcademica.idmodalidadacademica !== id );
    return {
      resp: 1, error: false,
      message: 'Modalidad Academica eliminado éxitosamente.',
      modalidadAcademica: modalidadAcademicaDB,
    };
  }
}
