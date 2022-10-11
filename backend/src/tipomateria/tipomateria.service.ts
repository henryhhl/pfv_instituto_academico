
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTipoMateriaDto } from './dto/create-tipomateria.dto';
import { UpdateTipoMateriaDto } from './dto/update-tipomateria.dto';
import { TipoMateria } from './entities/tipomateria.entity';

@Injectable()
export class TipoMateriaService {

  private listTipoMateria: TipoMateria[] = [];

  findAll() {
    const listTipoMateria = this.listTipoMateria;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayTipoMateria: listTipoMateria,
    };
  }

  store(createTipoMateriaDto: CreateTipoMateriaDto) {
    let tipoMateria: TipoMateria = {
      idtipomateria: uuid(),
      sigla: createTipoMateriaDto.sigla,
      descripcion: createTipoMateriaDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listTipoMateria.push(tipoMateria);

    return {
      resp: 1,
      error: false,
      message: 'Tipo Materia registrado éxitosamente.',
      tipoMateria: tipoMateria,
    };
  }

  findOne(idtipomateria: string) {
    const tipoMateria = this.listTipoMateria.find( (tipoMateria) => tipoMateria.idtipomateria === idtipomateria );
    // if ( !tipoMateria ) {
    //   throw new NotFoundException('Tipo Materia with id not found');
    // }
    return tipoMateria;
  }

  edit( idtipomateria: string ) {
    const tipoMateria = this.findOne(idtipomateria);
    if ( tipoMateria ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            tipoMateria: tipoMateria,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Tipo Materia no existe.',
    };
  }

  show( idtipomateria: string ) {
    const tipoMateria = this.findOne(idtipomateria);
    if ( tipoMateria ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoMateria: tipoMateria,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Tipo Materia no existe.',
    };
  }

  update(id: string, updateTipoMateriaDto: UpdateTipoMateriaDto) {
    let tipoMateriaDB = this.findOne(id);
    if ( tipoMateriaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo Materia no existe.',
      };
    }

    this.listTipoMateria = this.listTipoMateria.map( (tipoMateria) => {
      if ( tipoMateria.idtipomateria === id ) {
        tipoMateriaDB.updated_at = '';
        tipoMateriaDB = {
          ...tipoMateriaDB,
          ...updateTipoMateriaDto,
          idtipomateria: id,
          concurrencia: tipoMateria.concurrencia + 1,
        };
        return tipoMateriaDB;
      }
      return tipoMateria;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Tipo Materia actualizado éxitosamente.',
      tipoMateria: tipoMateriaDB,
    };
  }

  remove(id: string) {
    let tipoMateriaDB = this.findOne(id);
    if ( tipoMateriaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo Materia no existe.',
      };
    }
    this.listTipoMateria = this.listTipoMateria.filter( (tipoMateria) => tipoMateria.idtipomateria !== id );
    return {
      resp: 1, error: false,
      message: 'Tipo Materia eliminado éxitosamente.',
      tipoMateria: tipoMateriaDB,
    };
  }

  fillTipoMateriaSeedData( listTipoMateria: TipoMateria[] ) {
    this.listTipoMateria = listTipoMateria;
  }

}
