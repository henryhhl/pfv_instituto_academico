import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { Periodo } from './entities/periodo.entity';

@Injectable()
export class PeriodoService {

  private listPeriodo: Periodo[] = [];

  findAll() {
    const listPeriodo = this.listPeriodo;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayPeriodo: listPeriodo,
    };
  }

  store(createPeriodoDto: CreatePeriodoDto) {
    let periodo: Periodo = {
      idperiodo: uuid(),
      sigla: createPeriodoDto.sigla,
      descripcion: createPeriodoDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listPeriodo.push(periodo);

    return {
      resp: 1,
      error: false,
      message: 'Periodo registrado éxitosamente.',
      periodo: periodo,
    };
  }

  findOne(idperiodo: string) {
    const periodo = this.listPeriodo.find( (periodo) => periodo.idperiodo === idperiodo );
    return periodo;
  }

  edit( idperiodo: string ) {
    const periodo = this.findOne(idperiodo);
    if ( periodo ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            periodo: periodo,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Periodo no existe.',
    };
  }

  show( idperiodo: string ) {
    const periodo = this.findOne(idperiodo);
    if ( periodo ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            periodo: periodo,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Periodo no existe.',
    };
  }

  update(id: string, updatePeriodoDto: UpdatePeriodoDto) {
    let periodoDB = this.findOne(id);
    if ( periodoDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Periodo no existe.',
      };
    }

    this.listPeriodo = this.listPeriodo.map( (periodo) => {
      if ( periodo.idperiodo === id ) {
        periodoDB.updated_at = '';
        periodoDB = {
          ...periodoDB,
          ...updatePeriodoDto,
          idperiodo: id,
          concurrencia: periodo.concurrencia + 1,
        };
        return periodoDB;
      }
      return periodo;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Periodo actualizado éxitosamente.',
      periodo: periodoDB,
    };
  }

  remove(id: string) {
    let periodoDB = this.findOne(id);
    if ( periodoDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Periodo no existe.',
      };
    }
    this.listPeriodo = this.listPeriodo.filter( (periodo) => periodo.idperiodo !== id );
    return {
      resp: 1, error: false,
      message: 'Periodo eliminado éxitosamente.',
      periodo: periodoDB,
    };
  }
}
