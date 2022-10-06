import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateOfertaAcademicaDto } from './dto/create-ofertaacademica.dto';
import { UpdateOfertaAcademicaDto } from './dto/update-ofertaacademica.dto';
import { OfertaAcademica } from './entities/ofertaacademica.entity';

@Injectable()
export class OfertaAcademicaService {

  private listOfertaAcademica: OfertaAcademica[] = [];

  findAll() {
    const listOfertaAcademica = this.listOfertaAcademica;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayOfertaAcademica: listOfertaAcademica,
    };
  }

  store(createOfertaAcademicaDto: CreateOfertaAcademicaDto) {
    let ofertaAcademica: OfertaAcademica = {
      idofertaacademica: uuid(),
      sigla: createOfertaAcademicaDto.sigla,
      descripcion: createOfertaAcademicaDto.descripcion,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };

    this.listOfertaAcademica.push(ofertaAcademica);

    return {
      resp: 1,
      error: false,
      message: 'Oferta Academica registrado éxitosamente.',
      ofertaAcademica: ofertaAcademica,
    };
  }

  findOne(idofertaacademica: string) {
    const ofertaAcademica = this.listOfertaAcademica.find( (ofertaAcademica) => ofertaAcademica.idofertaacademica === idofertaacademica );
    return ofertaAcademica;
  }

  edit( idofertaacademica: string ) {
    const ofertaAcademica = this.findOne( idofertaacademica );
    if ( ofertaAcademica ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            ofertaAcademica: ofertaAcademica,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Oferta Academica no existe.',
    };
  }

  show( idofertaacademica: string ) {
    const ofertaAcademica = this.findOne( idofertaacademica );
    if ( ofertaAcademica ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            ofertaAcademica: ofertaAcademica,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Oferta Academica no existe.',
    };
  }

  update(id: string, updateOfertaAcademicaDto: UpdateOfertaAcademicaDto) {
    let ofertaAcademicaDB = this.findOne(id);
    if ( ofertaAcademicaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Oferta Academica no existe.',
      };
    }

    this.listOfertaAcademica = this.listOfertaAcademica.map( (ofertaAcademica) => {
      if ( ofertaAcademica.idofertaacademica === id ) {
        ofertaAcademicaDB.updated_at = '';
        ofertaAcademicaDB = {
          ...ofertaAcademicaDB,
          ...updateOfertaAcademicaDto,
          idofertaacademica: id,
          concurrencia: ofertaAcademica.concurrencia + 1,
        };
        return ofertaAcademicaDB;
      }
      return ofertaAcademica;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Oferta Academica actualizado éxitosamente.',
      ofertaAcademica: ofertaAcademicaDB,
    };
  }

  remove(id: string) {
    let ofertaAcademicaDB = this.findOne(id);
    if ( ofertaAcademicaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Oferta Academica no existe.',
      };
    }
    this.listOfertaAcademica = this.listOfertaAcademica.filter( (ofertaAcademica) => ofertaAcademica.idofertaacademica !== id );
    return {
      resp: 1, error: false,
      message: 'Oferta Academica eliminado éxitosamente.',
      ofertaAcademica: ofertaAcademicaDB,
    };
  }
}
