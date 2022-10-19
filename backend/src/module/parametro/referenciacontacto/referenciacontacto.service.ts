
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateReferenciaContactoDto } from './dto/create-referenciacontacto.dto';
import { UpdateReferenciaContactoDto } from './dto/update-referenciacontacto.dto';
import { ReferenciaContacto } from './entities/referenciacontacto.entity';

@Injectable()
export class ReferenciaContactoService {
  private listReferenciaContacto: ReferenciaContacto[] = [];

  findAll() {
    const listReferenciaContacto = this.listReferenciaContacto;
    return {
      resp: 1,
      error: false,
      message: 'Servicio realizado exitosamente.',
      arrayReferenciaContacto: listReferenciaContacto,
    };
  }

  store(createReferenciacontactoDto: CreateReferenciaContactoDto) {
    let referenciaContacto: ReferenciaContacto = {
      idreferenciacontacto: uuid(),
      descripcion: createReferenciacontactoDto.descripcion,
      // tiporeferenciacontacto: createReferenciacontactoDto.tiporeferenciacontacto,
      estado: 'A',
      concurrencia: 1,
      isdelete: 'A',
      created_at: '',
    };
    this.listReferenciaContacto.push(referenciaContacto);

    return {
      resp: 1,
      error: false,
      message: 'Referencia Contacto registrado éxitosamente.',
      referenciaContacto: referenciaContacto,
    };
  }

  findOne(idreferenciacontacto: string) {
    const referenciaContacto = this.listReferenciaContacto.find( 
      (referenciaContacto) => referenciaContacto.idreferenciacontacto === idreferenciacontacto 
    );
    return referenciaContacto;
  }

  edit(idreferenciacontacto: string) {
    const referenciaContacto = this.findOne(idreferenciacontacto);
    if ( referenciaContacto ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          referenciaContacto: referenciaContacto,
        };
    }
    return {
      resp: 0, error: false,
      message: 'Referencia Contacto no existe.',
    };
  }

  show(idreferenciacontacto: string) {
    const referenciaContacto = this.findOne(idreferenciacontacto);
    if ( referenciaContacto ) {
        return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            referenciaContacto: referenciaContacto,
        };
    }
    return {
        resp: 0, error: false,
        message: 'Referencia Contacto no existe.',
    };
  }

  update(id: string, updateReferenciacontactoDto: UpdateReferenciaContactoDto) {
    let referenciaContactoDB = this.findOne(id);
    if ( referenciaContactoDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Referencia Contacto no existe.',
      };
    }

    this.listReferenciaContacto = this.listReferenciaContacto.map( (referenciaContacto) => {
      if ( referenciaContacto.idreferenciacontacto === id ) {
        referenciaContactoDB.updated_at = '';
        referenciaContactoDB = {
          ...referenciaContactoDB,
          ...updateReferenciacontactoDto,
          idreferenciacontacto: id,
          concurrencia: referenciaContacto.concurrencia + 1,
        };
        return referenciaContactoDB;
      }
      return referenciaContacto;
    } );
    return {
      resp: 1,
      error: false,
      message: 'Referencia Contacto actualizado éxitosamente.',
      referenciaContacto: referenciaContactoDB,
    };
  }

  remove(id: string) {
    let referenciaContactoDB = this.findOne(id);
    if ( referenciaContactoDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Referencia Contacto no existe.',
      };
    }
    this.listReferenciaContacto = this.listReferenciaContacto.filter( 
      (referenciaContacto) => referenciaContacto.idreferenciacontacto !== id 
    );
    return {
      resp: 1, error: false,
      message: 'Referencia Contacto eliminado éxitosamente.',
      referenciaContacto: referenciaContactoDB,
    };
  }
}
