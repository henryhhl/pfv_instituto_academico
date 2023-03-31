import { Injectable, Logger } from '@nestjs/common';
import { CreateNotaGrupoDto } from './dto/create-notagrupo.dto';
import { UpdateNotagrupoDto } from './dto/update-notagrupo.dto';
import { NotaGrupo } from './entities/notagrupo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotagrupoService {
  private readonly logger = new Logger('NotaGrupoService');

  constructor(
    @InjectRepository(NotaGrupo)
    private readonly notaGrupoRepository: Repository<NotaGrupo>,
  ) {}

  create(createNotagrupoDto: CreateNotaGrupoDto) {
    return 'This action adds a new notagrupo';
  }

  findAll() {
    return `This action returns all notagrupo`;
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

  async storeNotaDefaultForInscripcionGrupo( 
    fkidinscripciongrupo: string, fkidparametrocalificacion: string, valorporcentaje: number,
  ) {
    try {
      const notaGrupoCreate = this.notaGrupoRepository.create( {
        inscripcionGrupo: {
          idinscripciongrupo: fkidinscripciongrupo,
        },
        parametroCalificacion: {
          idparametrocalificacion: fkidparametrocalificacion,
        },
        valorporcentaje,
        created_at: this.getDateTime(),
      } );
      return await this.notaGrupoRepository.save( notaGrupoCreate );
      
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async findOne(idnotagrupo: string) {
    try {
      if ( idnotagrupo === null ) return null;
      return await this.notaGrupoRepository.findOne( {
        where: { idnotagrupo: idnotagrupo, },
      } );
    } catch (error) {
      return null;
    }
  }

  async update(request: CreateNotaGrupoDto) {
    try {
      if ( Array.isArray( request.arrayNotaGrupo ) ) {
        let pos = 0;
        for (let index = 0; index < request.arrayNotaGrupo.length; index++) {
          const element = request.arrayNotaGrupo[index];

          const notaGrupoPreLoad = await this.notaGrupoRepository.preload( {
            idnotagrupo: element.idnotagrupo,
            nota: element.nota,
            updated_at: this.getDateTime(),
          } );

          if ( notaGrupoPreLoad !== null ) {
            await this.notaGrupoRepository.save( notaGrupoPreLoad );
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
    return `This action removes a #${id} notagrupo`;
  }

  async delete(idnotagrupo: string) {
    try {
      let notaGrupoFirst = await this.findOne(idnotagrupo);
      if ( notaGrupoFirst === null ) {
        return false;
      }
      const notaGrupoDelete = await this.notaGrupoRepository.remove( notaGrupoFirst );
      if ( notaGrupoDelete ) {
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async getEstudianteInscrito( fkidinscripciongrupo: string ) {
    try {
      if ( fkidinscripciongrupo === null ) return [];
      return await this.notaGrupoRepository.find( {
        relations: {
          parametroCalificacion: true,
        },
        where: {
          inscripcionGrupo: {
            idinscripciongrupo: fkidinscripciongrupo,
          },
        },
        order: { created_at: "DESC", },
      } )
    } catch (error) {
      return [];
    }
  }
}
