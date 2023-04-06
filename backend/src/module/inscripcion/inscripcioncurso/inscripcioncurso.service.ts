import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InscripcionCurso } from './entities/inscripcioncurso.entity';
import { InscripcionCursoPaginationDto } from './dto/pagination.dto';
import { CreateInscripcionCursoDto } from './dto/create-inscripcioncurso.dto';
import { UpdateInscripcionCursoDto } from './dto/update-inscripcioncurso.dto';
import { EstudianteForCursoInscripcionCursoDto } from './dto/estudiante-curso.dto';
import { CursoService } from '../../ofertaacademica/curso/curso.service';
import { NotacursoService } from '../../nota/notacurso/notacurso.service';
import { EstudianteService } from '../../persona/estudiante/estudiante.service';
import { TurnoService } from '../../estructurainstitucional/turno/turno.service';
import { UnidadNegocioService } from '../../parametro/unidadnegocio/unidadnegocio.service';
import { AsistenciacursoService } from '../../nota/asistenciacurso/asistenciacurso.service';
import { ModalidadAcademicaService } from '../../parametro/modalidadacademica/modalidadacademica.service';
import { UnidadacademicaService } from '../../estructuraacademica/unidadacademica/unidadacademica.service';
import { GestionPeriodoService } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.service';
import { UnidadAdministrativaService } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.service';

@Injectable()
export class InscripcionCursoService {
  private readonly logger = new Logger('InscripcionCursoService');

  constructor(
    @InjectRepository(InscripcionCurso)
    private readonly inscripcionCursoRepository: Repository<InscripcionCurso>,

    private readonly unidadAdministrativaService: UnidadAdministrativaService,
    private readonly modalidadAcademicaService: ModalidadAcademicaService,
    private readonly unidadAcademicaService: UnidadacademicaService,
    private readonly gestionPeriodoService: GestionPeriodoService,
    private readonly unidadNegocioService: UnidadNegocioService,
    private readonly estudianteService: EstudianteService,
    private readonly turnoService: TurnoService,
    private readonly cursoService: CursoService,
    private readonly asistenciaCursoService: AsistenciacursoService,
    private readonly notaCursoService: NotacursoService,
  ) {}

  async findAll( paginationDto: InscripcionCursoPaginationDto ) {
    try {
      const { limit = 1, offset = 0, esPaginate = false, } = paginationDto;
      let listInscripcionCurso = [];
      let totalPagination = 0;
      
      const curso = await this.cursoService.findOne(paginationDto.fkidcurso);

      if ( esPaginate ) {
        [listInscripcionCurso, totalPagination] = await this.inscripcionCursoRepository.findAndCount( {
          take: limit, skip: offset * limit,
          relations: {
            estudiante: true, gestionperiodo: true,
          },
          where: [
            { curso: { idcurso: paginationDto.fkidcurso, }, },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listInscripcionCurso, totalPagination] = await this.inscripcionCursoRepository.findAndCount( {
          relations: {
            estudiante: true, gestionperiodo: true,
          },
          where: [
            { curso: { idcurso: paginationDto.fkidcurso, }, },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayInscripcionCurso: listInscripcionCurso,
        pagination: {
          total: totalPagination,
        },
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async findEstudianteForCurso(request: EstudianteForCursoInscripcionCursoDto) {
    try {
      let list = [];
      let total = 0;

      const curso = this.cursoService.findOne( request.fkidcurso );
      if ( curso !== null ) {

        [list, total] = await this.inscripcionCursoRepository.findAndCount( {
          where: { 
            curso: { idcurso: request.fkidcurso, },
          },
          relations: {
            estudiante: true, 
            arrayAsistenciaCurso: true,
            arrayNotaCurso: {
              parametroCalificacion: true,
            },
          },
          order: {  
            estudiante: {
              apellidoprimero: 'ASC',
            },
            arrayAsistenciaCurso: {
              created_at: 'ASC',
            },
            arrayNotaCurso: {
              created_at: 'ASC',
            },
          },
        } );

      }

      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayEstudianteInscrito: list,
        pagination: {
          total: total,
        },
      };

    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
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

  async store(createInscripcioncursoDto: CreateInscripcionCursoDto) {
    try {

      const unidadAdministrativa = await this.unidadAdministrativaService.findOne(createInscripcioncursoDto.fkidunidadadministrativa);
      if ( unidadAdministrativa === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Administrativa no existe.',
        };
      }
      const unidadAcademica = await this.unidadAcademicaService.findOne(createInscripcioncursoDto.fkidunidadacademica);
      if ( unidadAcademica === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Academica no existe.',
        };
      }
      const unidadNegocio = await this.unidadNegocioService.findOne(createInscripcioncursoDto.fkidunidadnegocio);
      if ( unidadNegocio === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Negocio no existe.',
        };
      }
      const estudiante = await this.estudianteService.findOne(createInscripcioncursoDto.fkidestudiante);
      if ( estudiante === null ) {
        return {
          resp: 0, error: false,
          message: 'Estudiante no existe.',
        };
      }
      const gestionPeriodo = await this.gestionPeriodoService.findOne(createInscripcioncursoDto.fkidgestionperiodo);
      if ( gestionPeriodo === null ) {
        return {
          resp: 0, error: false,
          message: 'Periodo no existe.',
        };
      }
      const turno = await this.turnoService.findOne(createInscripcioncursoDto.fkidturno);
      if ( turno === null ) {
        return {
          resp: 0, error: false,
          message: 'Turno no existe.',
        };
      }
      const curso = await this.cursoService.findOne(createInscripcioncursoDto.fkidcurso);
      if ( curso === null ) {
        return {
          resp: 0, error: false,
          message: 'Curso no existe.',
        };
      }
      const modalidadAcademica = await this.modalidadAcademicaService.findOne(createInscripcioncursoDto.fkidmodalidadacademica);
      if ( modalidadAcademica === null ) {
        return {
          resp: 0, error: false,
          message: 'Modalidad Academica no existe.',
        };
      }

      const inscripcionCursoFirst = await this.inscripcionCursoRepository.findOne( {
        where: {
          gestionperiodo: { idgestionperiodo: createInscripcioncursoDto.fkidgestionperiodo, },
          estudiante: { idestudiante: createInscripcioncursoDto.fkidestudiante, },
          curso: { idcurso: createInscripcioncursoDto.fkidcurso, },
        },
      } );

      if ( inscripcionCursoFirst ) {
        return {
          resp: 0, error: false,
          message: 'Estudiante ya se encuentra actualmente inscrito en este curso.',
        };
      }

      const inscripcionCursoCreate = this.inscripcionCursoRepository.create( {
        ...createInscripcioncursoDto,
        unidadadministrativa: { idunidadadministrativa: createInscripcioncursoDto.fkidunidadadministrativa, },
        unidadacademica: { idunidadacademica: createInscripcioncursoDto.fkidunidadacademica, },
        unidadnegocio: { idunidadnegocio: createInscripcioncursoDto.fkidunidadnegocio, },
        estudiante: { idestudiante: createInscripcioncursoDto.fkidestudiante, },
        gestionperiodo: { idgestionperiodo: createInscripcioncursoDto.fkidgestionperiodo, },
        turno: { idturno: createInscripcioncursoDto.fkidturno, },
        curso: { idcurso: createInscripcioncursoDto.fkidcurso, },
        modalidadacademica: { idmodalidadacademica: createInscripcioncursoDto.fkidmodalidadacademica, },
        created_at: this.getDateTime(),
      } );

      const inscripcionCursoStore = await this.inscripcionCursoRepository.save( inscripcionCursoCreate );

      const dateStringFinish = this.convertDMYForYMD(curso.fechafinal);
      let dateInit = this.convertStringforDate(curso.fechainicio);

      while ( this.convertDateToString(dateInit) <= dateStringFinish ) {
        await this.asistenciaCursoService.storeAsistenciaDefaultForInscripcionCurso(
          inscripcionCursoCreate.idinscripcioncurso,
          this.convertDateToDMYString(dateInit),
          this.getTextDayforIndex(this.getWeekDay(dateInit.getFullYear(), dateInit.getMonth(), dateInit.getDate())),
          this.getWeekDay(dateInit.getFullYear(), dateInit.getMonth(), dateInit.getDate()),
        );
        dateInit.setDate( dateInit.getDate() + 1 );
      }

      for (let index = 0; index < curso.arrayCursoParametroCalificacion.length; index++) {
        const detalle = curso.arrayCursoParametroCalificacion[index];
        console.log(detalle)
        await this.notaCursoService.storeNotaDefaultForInscripcionCurso(
          inscripcionCursoCreate.idinscripcioncurso,
          detalle,
        );
      }

      return {
        resp: 1, error: false,
        message: 'Inscripción Curso registrado éxitosamente.',
        inscripcionCurso: inscripcionCursoStore,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  getWeekDay = (year: number, mounth: number, day: number) => {
    return new Date(year, mounth, day).getDay();
  }

  getTextDayforIndex = (index: number) => {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    return days[index];
  }

  convertDMYForYMD(dateToString = "") {
    if ( dateToString.split('/').length < 3 ) return null;
    const [day, month, year] = dateToString.split('/');
    return `${year}-${month}-${day}`;
  }

  convertStringforDate(dateToString = "") {
    const [day, month, year] = dateToString.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  convertDateToString = ( date = new Date(), separator = '-' ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    let monthString = month < 10 ? `0${month}` : month;
    let daySatring = day < 10 ? `0${day}` : day;

    return year + separator + monthString + separator + daySatring;
  }

  convertDateToDMYString = ( date = new Date() ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    let monthString = month < 10 ? `0${month}` : month;
    let daySatring = day < 10 ? `0${day}` : day;

    return `${daySatring}/${monthString}/${year}`
}

  async findOne(idinscripcioncurso: string) {
    const inscripcionCurso = await this.inscripcionCursoRepository.findOneBy( {
      idinscripcioncurso,
    } );
    return inscripcionCurso;
  }

  async edit(idinscripcioncurso: string) {
    try {
      const inscripcionCurso = await this.findOne(idinscripcioncurso);
      if ( inscripcionCurso ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          inscripcionCurso: inscripcionCurso,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Inscripción Curso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idinscripcioncurso: string) {
    try {
      const inscripcionCurso = await this.findOne(idinscripcioncurso);
      if ( inscripcionCurso ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          inscripcionCurso: inscripcionCurso,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Inscripción Curso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idinscripcioncurso: string, updateInscripcioncursoDto: UpdateInscripcionCursoDto) {
    return `This action updates a #${idinscripcioncurso} inscripcioncurso`;
  }

  async delete(idinscripcioncurso: string) {
    try {
      let inscripcionCurso = await this.findOne(idinscripcioncurso);
      if ( inscripcionCurso === null ) {
        return {
          resp: 0, error: true,
          message: 'Inscripción Curso no existe.',
        };
      }

      const listAsistenciaEstudianteInscrito = await this.asistenciaCursoService.getEstudianteInscrito( idinscripcioncurso );
      for (let index = 0; index < listAsistenciaEstudianteInscrito.length; index++) {
        const element = listAsistenciaEstudianteInscrito[index];
        await this.asistenciaCursoService.delete( element.idasistenciacurso );
      }

      const listNotasEstudianteInscrito = await this.notaCursoService.getEstudianteInscrito( idinscripcioncurso );
      for (let index = 0; index < listNotasEstudianteInscrito.length; index++) {
        const element = listNotasEstudianteInscrito[index];
        await this.notaCursoService.delete( element.idnotacurso );
      }

      const inscripcionCursoDelete = await this.inscripcionCursoRepository.remove( inscripcionCurso );
      return {
        resp: 1, error: false,
        message: 'Inscripción Curso eliminado éxitosamente.',
        inscripcionCurso: inscripcionCursoDelete,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async getEstudianteInscrito( fkidcurso: string ) {
    try {
      if ( fkidcurso === null ) return [];
      return await this.inscripcionCursoRepository.find( {
        relations: {
          curso: true,
        },
        where: {
          curso: {
            idcurso: fkidcurso,
          },
        },
        order: { created_at: "ASC", },
      } );
    } catch (error) {
      return [];
    }
  }

}
