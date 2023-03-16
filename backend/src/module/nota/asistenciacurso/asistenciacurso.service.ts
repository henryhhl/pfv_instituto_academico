import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { AsistenciaCurso } from './entities/asistenciacurso.entity';
import { CreateAsistenciaCursoDto } from './dto/create-asistenciacurso.dto';
import { UpdateAsistenciacursoDto } from './dto/update-asistenciacurso.dto';

@Injectable()
export class AsistenciacursoService {
  private readonly logger = new Logger('AsistenciaCursoService');

  constructor(
    @InjectRepository(AsistenciaCurso)
    private readonly asistenciaCursoRepository: Repository<AsistenciaCurso>,
  ) {}

  create(createAsistenciacursoDto: CreateAsistenciaCursoDto) {
    return 'This action adds a new asistenciacurso';
  }

  findAll() {
    return `This action returns all asistenciacurso`;
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

  async storeAsistenciaDefaultForInscripcionCurso( 
    fkidasistencia: string, fechaasistencia: string, dayweekname: string, dayweek: number,
  ) {
    try {
      const asistenciaCursoCreate = this.asistenciaCursoRepository.create( {
        inscripcionCurso: {
          idinscripcioncurso: fkidasistencia,
        },
        fechaasistencia: fechaasistencia,
        dayweekname: dayweekname,
        dayweek: dayweek,
        created_at: this.getDateTime(),
      } );
      return await this.asistenciaCursoRepository.save( asistenciaCursoCreate );
      
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async findOne(idasistenciacurso: string) {
    try {
      if ( idasistenciacurso === null ) return null;
      const asistenciaCurso = await this.asistenciaCursoRepository.findOne( {
        where: { idasistenciacurso: idasistenciacurso, },
      } );
      return asistenciaCurso;
    } catch (error) {
      return null;
    }
  }

  async update(request: CreateAsistenciaCursoDto) {
    try {
      if ( Array.isArray( request.arrayAsistencia ) ) {
        let pos = 0;
        for (let index = 0; index < request.arrayAsistencia.length; index++) {
          const element = request.arrayAsistencia[index];

          const asistenciaGrupoPreLoad = await this.asistenciaCursoRepository.preload( {
            idasistenciacurso: element.idasistenciacurso,
            asistencia: element.asistencia,
            updated_at: this.getDateTime(),
          } );

          if ( asistenciaGrupoPreLoad !== null ) {
            await this.asistenciaCursoRepository.save( asistenciaGrupoPreLoad );
            pos++;
          }
        }
        if ( pos > 0 ) {
          return {
            resp: 1, error: false,
            message: 'Asistencia actualizado éxitosamente.',
          };
        }
        return {
          resp: 1, error: false,
          message: 'Asistencia actualizado éxitosamente.',
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

  async delete(idasistenciacurso: string) {
    try {
      let asistenciaCurso = await this.findOne(idasistenciacurso);
      if ( asistenciaCurso === null ) {
        return false;
      }
      const asistenciaCursoDelete = await this.asistenciaCursoRepository.remove( asistenciaCurso );
      if ( asistenciaCursoDelete ) {
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
      return await this.asistenciaCursoRepository.find( {
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

  remove(id: number) {
    return `This action removes a #${id} asistenciacurso`;
  }
}
