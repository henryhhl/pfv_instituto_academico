import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateNivelAcademicoDto } from './dto/create-nivelacademico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivelacademico.dto';
import { NivelAcademico } from './entities/nivelacademico.entity';

@Injectable()
export class NivelAcademicoService {

  private listNivelAcademico: NivelAcademico[] = [];

  findAll() {
    const listNivelAcademico = this.listNivelAcademico;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayNivelAcademico: listNivelAcademico,
    };
  }

  store(createNivelAcademicoDto: CreateNivelAcademicoDto) {
    let nivelAcademico: NivelAcademico = {
      idnivelacademico: uuid(),
      sigla: createNivelAcademicoDto.sigla,
      descripcion: createNivelAcademicoDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listNivelAcademico.push(nivelAcademico);

    return {
      resp: 1,
      error: false,
      message: 'Nivel Academico registrado éxitosamente.',
      nivelAcademico: nivelAcademico,
    };
  }

  findOne(idnivelacademico: string) {
    const nivelAcademico = this.listNivelAcademico.find( (nivelAcademico) => nivelAcademico.idnivelacademico === idnivelacademico );
    return nivelAcademico;
  }

  edit( idnivelacademico: string ) {
    const nivelAcademico = this.findOne(idnivelacademico);
    if ( nivelAcademico ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            nivelAcademico: nivelAcademico,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Nivel Academico no existe.',
    };
  }

  show( idnivelacademico: string ) {
    const nivelAcademico = this.findOne(idnivelacademico);
    if ( nivelAcademico ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            nivelAcademico: nivelAcademico,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Nivel Academico no existe.',
    };
  }

  update(id: string, updateNivelAcademicoDto: UpdateNivelAcademicoDto) {
    let nivelAcademicoDB = this.findOne(id);
    if ( nivelAcademicoDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Nivel Academico no existe.',
      };
    }

    this.listNivelAcademico = this.listNivelAcademico.map( (nivelAcademico) => {
      if ( nivelAcademico.idnivelacademico === id ) {
        nivelAcademicoDB.updated_at = '';
        nivelAcademicoDB = {
          ...nivelAcademicoDB,
          ...updateNivelAcademicoDto,
          idnivelacademico: id,
          concurrencia: nivelAcademico.concurrencia + 1,
        };
        return nivelAcademicoDB;
      }
      return nivelAcademico;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Nivel Academico actualizado éxitosamente.',
      nivelAcademico: nivelAcademicoDB,
    };
  }

  remove(id: string) {
    let nivelAcademicoDB = this.findOne(id);
    if ( nivelAcademicoDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Nivel Academico no existe.',
      };
    }
    this.listNivelAcademico = this.listNivelAcademico.filter( (nivelAcademico) => nivelAcademico.idnivelacademico !== id );
    return {
      resp: 1, error: false,
      message: 'Nivel Academico eliminado éxitosamente.',
      nivelAcademico: nivelAcademicoDB,
    };
  }
}
