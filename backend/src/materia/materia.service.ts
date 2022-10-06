import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';

@Injectable()
export class MateriaService {

  private listMateria: Materia[] = [];

  findAll() {
    const listMateria = this.listMateria;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayMateria: listMateria,
    };
  }

  store(createMateriaDto: CreateMateriaDto) {
    let materia: Materia = {
      idmateria: uuid(),
      fkidtipomateria: createMateriaDto.fkidtipomateria,
      tipomateria: createMateriaDto.tipomateria,
      codigo: createMateriaDto.codigo,
      sigla: createMateriaDto.sigla,
      nombrelargo: createMateriaDto.nombrelargo,
      nombrecorto: createMateriaDto.nombrecorto,
      nombrealternativo: createMateriaDto.nombrealternativo,
      creditos: createMateriaDto.creditos,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listMateria.push(materia);

    return {
      resp: 1,
      error: false,
      message: 'Materia registrado éxitosamente.',
      materia: materia,
    };
  }

  findOne(idmateria: string) {
    const materia = this.listMateria.find( (materia) => materia.idmateria === idmateria );
    return materia;
  }

  edit( idmateria: string ) {
    const materia = this.findOne(idmateria);
    if ( materia ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            materia: materia,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Materia no existe.',
    };
  }

  show( idmateria: string ) {
    const materia = this.findOne(idmateria);
    if ( materia ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            materia: materia,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Materia no existe.',
    };
  }

  update(id: string, updateMateriaDto: UpdateMateriaDto) {
    let materiaDB = this.findOne(id);
    if ( materiaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Materia no existe.',
      };
    }

    this.listMateria = this.listMateria.map( (materia) => {
      if ( materia.idmateria === id ) {
        materiaDB.updated_at = '';
        materiaDB = {
          ...materiaDB,
          ...updateMateriaDto,
          idmateria: id,
          concurrencia: materia.concurrencia + 1,
        };
        return materiaDB;
      }
      return materia;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Materia actualizado éxitosamente.',
      materia: materiaDB,
    };
  }

  remove(id: string) {
    let materiaDB = this.findOne(id);
    if ( materiaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Materia no existe.',
      };
    }
    this.listMateria = this.listMateria.filter( (materia) => materia.idmateria !== id );
    return {
      resp: 1, error: false,
      message: 'Materia eliminado éxitosamente.',
      materia: materiaDB,
    };
  }
}
