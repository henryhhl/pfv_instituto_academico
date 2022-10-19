import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTipoCiudadDto } from './dto/create-tipociudad.dto';
import { UpdateTipoCiudadDto } from './dto/update-tipociudad.dto';
import { TipoCiudad } from './entities/tipociudad.entity';

@Injectable()
export class TipoCiudadService {
  private listTipoCiudad: TipoCiudad[] = [];

  findAll() {
    const listTipoCiudad = this.listTipoCiudad;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayTipoCiudad: listTipoCiudad,
    };
  }

  store(createTipociudadDto: CreateTipoCiudadDto) {
    let tipoCiudad: TipoCiudad = {
      idtipociudad: uuid(),
      descripcion: createTipociudadDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };
    this.listTipoCiudad.push(tipoCiudad);

    return {
      resp: 1,
      error: false,
      message: 'Tipo Ciudad registrado éxitosamente.',
      tipoCiudad: tipoCiudad,
    };
  }

  findOne(idtipociudad: string) {
    const tipoCiudad = this.listTipoCiudad.find( 
      (tipoCiudad) => tipoCiudad.idtipociudad === idtipociudad 
    );
    return tipoCiudad;
  }

  edit(idtipociudad: string) {
    const tipoCiudad = this.findOne(idtipociudad);
    if ( tipoCiudad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoCiudad: tipoCiudad,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Tipo Ciudad no existe.',
    };
  }

  show(idtipociudad: string) {
    const tipoCiudad = this.findOne(idtipociudad);
    if ( tipoCiudad ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            tipoCiudad: tipoCiudad,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Tipo Ciudad no existe.',
    };
  }

  update(id: string, updateTipociudadDto: UpdateTipoCiudadDto) {
    let tipoCiudadDB = this.findOne(id);
    if ( tipoCiudadDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo Ciudad no existe.',
      };
    }

    this.listTipoCiudad = this.listTipoCiudad.map( (tipoCiudad) => {
      if ( tipoCiudad.idtipociudad === id ) {
        tipoCiudadDB.updated_at = '';
        tipoCiudadDB = {
          ...tipoCiudadDB,
          ...updateTipociudadDto,
          idtipociudad: id,
          concurrencia: tipoCiudad.concurrencia + 1,
        };
        return tipoCiudadDB;
      }
      return tipoCiudad;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Tipo Ciudad actualizado éxitosamente.',
      tipoCiudad: tipoCiudadDB,
    };
  }

  remove(id: string) {
    let tipoCiudadDB = this.findOne(id);
    if ( tipoCiudadDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo Ciudad no existe.',
      };
    }
    this.listTipoCiudad = this.listTipoCiudad.filter( 
      (tipoCiudad) => tipoCiudad.idtipociudad !== id 
    );
    return {
      resp: 1, error: false,
      message: 'Tipo Ciudad eliminado éxitosamente.',
      tipoCiudad: tipoCiudadDB,
    };
  }
}
