import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { NotaCurso } from './entities/notacurso.entity';
import { CreateNotaCursoDto } from './dto/create-notacurso.dto';
import { UpdateNotacursoDto } from './dto/update-notacurso.dto';
import { CursoParametroCalificacion } from '../../ofertaacademica/curso/entities/cursoparametrocalificacion.entity';

@Injectable()
export class NotacursoService {
  private readonly logger = new Logger('NotaCursoService');

  constructor(
    @InjectRepository(NotaCurso)
    private readonly notaCursoRepository: Repository<NotaCurso>,
  ) {}

  create(createNotacursoDto: CreateNotaCursoDto) {
    return 'This action adds a new notacurso';
  }

  findAll() {
    return `This action returns all notacurso`;
  }

  private getDateTime() {
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear().toString();
    
    month = (+month < 10) ? "0" + month : month;
    day = (+day < 10) ? "0" + day : day;

    let hour = date.getHours().toString();
    let minutes  = date.getMinutes().toString();
    let segundos = date.getSeconds().toString();
    let milliSeconds = date.getMilliseconds().toString();

    hour = (+hour < 10) ? "0" + hour : hour;
    minutes = (+minutes < 10) ? "0" + minutes : minutes;
    segundos = (+segundos < 10) ? "0" + segundos : segundos;

    return `${year}-${month}-${day} ${hour}:${minutes}:${segundos}:${milliSeconds}`;
  }

  async storeNotaDefaultForInscripcionCurso( 
    fkidinscripcioncurso: string, detalle: CursoParametroCalificacion,
  ) {
    try {
      const notaCursoCreate = this.notaCursoRepository.create( {
        fkidcursoparametrocalificacion: detalle.idcursoparametrocalificacion,
        inscripcionCurso: {
          idinscripcioncurso: fkidinscripcioncurso,
        },
        parametroCalificacion: {
          idparametrocalificacion: detalle.parametroCalificacion.idparametrocalificacion,
        },
        valorporcentaje: detalle.valorporcentaje,
        created_at: this.getDateTime(),
      } );
      return await this.notaCursoRepository.save( notaCursoCreate );
      
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async findOne(idnotacurso: string) {
    try {
      if ( idnotacurso === null ) return null;
      const notaCurso = await this.notaCursoRepository.findOne( {
        where: { idnotacurso: idnotacurso, },
      } );
      return notaCurso;
    } catch (error) {
      return null;
    }
  }

  async update(request: CreateNotaCursoDto) {
    try {
      if ( Array.isArray( request.arrayNotaCurso ) ) {
        let pos = 0;
        for (let index = 0; index < request.arrayNotaCurso.length; index++) {
          const element = request.arrayNotaCurso[index];

          const notaCursoPreLoad = await this.notaCursoRepository.preload( {
            idnotacurso: element.idnotacurso,
            nota: element.nota,
            updated_at: this.getDateTime(),
          } );

          if ( notaCursoPreLoad !== null ) {
            await this.notaCursoRepository.save( notaCursoPreLoad );
            pos++;
          }
        }
        if ( pos > 0 ) {
          return {
            resp: 1, error: false,
            message: 'Nota actualizado éxitosamente.',
          };
        }
        return {
          resp: 1, error: false,
          message: 'Nota actualizado éxitosamente.',
        };
      }
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} notacurso`;
  }

  async delete(idnotacurso: string) {
    try {
      let notaCursoFirst = await this.findOne(idnotacurso);
      if ( notaCursoFirst === null ) {
        return false;
      }
      const notaCursoDelete = await this.notaCursoRepository.remove( notaCursoFirst );
      if ( notaCursoDelete ) {
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async getEstudianteInscrito( fkidinscripcioncurso: string ) {
    try {
      if ( fkidinscripcioncurso === null ) return [];
      return await this.notaCursoRepository.find( {
        relations: {
          parametroCalificacion: true,
        },
        where: {
          inscripcionCurso: {
            idinscripcioncurso: fkidinscripcioncurso,
          },
        },
        order: { created_at: "DESC", },
      } )
    } catch (error) {
      return [];
    }
  }

}
