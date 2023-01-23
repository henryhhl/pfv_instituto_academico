import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InscripcionCursoPaginationDto } from './dto/pagination.dto';
import { InscripcionCurso } from './entities/inscripcioncurso.entity';
import { CreateInscripcionCursoDto } from './dto/create-inscripcioncurso.dto';
import { UpdateInscripcionCursoDto } from './dto/update-inscripcioncurso.dto';
import { CursoService } from '../../ofertaacademica/curso/curso.service';
import { EstudianteService } from '../../persona/estudiante/estudiante.service';
import { TurnoService } from '../../estructurainstitucional/turno/turno.service';
import { UnidadNegocioService } from '../../parametro/unidadnegocio/unidadnegocio.service';
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
  ) {}

  async findAll( paginationDto: InscripcionCursoPaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
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
            // { fechainscripcion: ILike( '%' + search + '%', ), },
            { curso: curso, },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listInscripcionCurso, totalPagination] = await this.inscripcionCursoRepository.findAndCount( {
          relations: {
            estudiante: true, gestionperiodo: true,
          },
          where: [
            // { fechainscripcion: ILike( '%' + search + '%', ), },
            { curso: curso, },
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
          gestionperiodo: gestionPeriodo,
          estudiante: estudiante,
          curso: curso,
        },
      } );

      if ( inscripcionCursoFirst ) {
        return {
          resp: 0, error: false,
          message: 'Estudiante ya se encuentra actualmente inscrito en este curso.',
        };
      }

      const inscripcionCurso = this.inscripcionCursoRepository.create( {
        ...createInscripcioncursoDto,
        unidadadministrativa: unidadAdministrativa,
        unidadacademica: unidadAcademica,
        unidadnegocio: unidadNegocio,
        estudiante: estudiante,
        gestionperiodo: gestionPeriodo,
        turno: turno,
        curso: curso,
        modalidadacademica: modalidadAcademica,
        created_at: this.getDateTime(),
      } );
      const inscripcionCursoStore = await this.inscripcionCursoRepository.save( inscripcionCurso );
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
      await this.inscripcionCursoRepository.remove( inscripcionCurso );
      return {
        resp: 1, error: false,
        message: 'Inscripción Curso eliminado éxitosamente.',
        inscripcionCurso: inscripcionCurso,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }
}
