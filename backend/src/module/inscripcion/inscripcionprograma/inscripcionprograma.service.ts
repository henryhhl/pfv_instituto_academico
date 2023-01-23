import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InscripcionProgramaPaginationDto } from './dto/pagination.dto';
import { InscripcionPrograma } from './entities/inscripcionprograma.entity';
import { CreateInscripcionProgramaDto } from './dto/create-inscripcionprograma.dto';
import { UpdateInscripcionProgramaDto } from './dto/update-inscripcionprograma.dto';
import { PensumService } from '../../estructuraacademica/pensum/pensum.service';
import { EstudianteService } from '../../persona/estudiante/estudiante.service';
import { ProgramaService } from '../../estructuraacademica/programa/programa.service';
import { UnidadNegocioService } from '../../parametro/unidadnegocio/unidadnegocio.service';
import { ModalidadAcademicaService } from '../../parametro/modalidadacademica/modalidadacademica.service';
import { UnidadacademicaService } from '../../estructuraacademica/unidadacademica/unidadacademica.service';
import { GestionPeriodoService } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.service';
import { UnidadAdministrativaService } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.service';

@Injectable()
export class InscripcionProgramaService {
  private readonly logger = new Logger('InscripcionProgramaService');

  constructor(
    @InjectRepository(InscripcionPrograma)
    private readonly inscripcionProgramaRepository: Repository<InscripcionPrograma>,

    private readonly unidadAdministrativaService: UnidadAdministrativaService,
    private readonly modalidadAcademicaService: ModalidadAcademicaService,
    private readonly unidadAcademicaService: UnidadacademicaService,
    private readonly gestionPeriodoService: GestionPeriodoService,
    private readonly unidadNegocioService: UnidadNegocioService,
    private readonly estudianteService: EstudianteService,
    private readonly programaService: ProgramaService,
    private readonly pensumService: PensumService,
  ) {}

  async findAll( paginationDto: InscripcionProgramaPaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listInscripcionPrograma = [];
      let totalPagination = 0;
      
      const programa = await this.programaService.findOne(paginationDto.fkidprograma);
      const gestionPeriodo = await this.gestionPeriodoService.findOne(paginationDto.fkidgestionperiodo);

      if ( esPaginate ) {
        [listInscripcionPrograma, totalPagination] = await this.inscripcionProgramaRepository.findAndCount( {
          take: limit, skip: offset * limit,
          relations: {
            estudiante: true, gestionperiodo: true, programa: true,
          },
          where: [
            // { fechainscripcion: ILike( '%' + search + '%', ), },
            { programa: programa, gestionperiodo: gestionPeriodo, },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listInscripcionPrograma, totalPagination] = await this.inscripcionProgramaRepository.findAndCount( {
          relations: {
            estudiante: true, gestionperiodo: true, programa: true,
          },
          where: [
            // { fechainscripcion: ILike( '%' + search + '%', ), },
            { programa: programa, gestionperiodo: gestionPeriodo, },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayInscripcionPrograma: listInscripcionPrograma,
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

  async store(createInscripcionprogramaDto: CreateInscripcionProgramaDto) {
    try {
      const unidadAdministrativa = await this.unidadAdministrativaService.findOne(createInscripcionprogramaDto.fkidunidadadministrativa);
      if ( unidadAdministrativa === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Administrativa no existe.',
        };
      }
      const unidadAcademica = await this.unidadAcademicaService.findOne(createInscripcionprogramaDto.fkidunidadacademica);
      if ( unidadAcademica === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Academica no existe.',
        };
      }
      const unidadNegocio = await this.unidadNegocioService.findOne(createInscripcionprogramaDto.fkidunidadnegocio);
      if ( unidadNegocio === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Negocio no existe.',
        };
      }
      const programa = await this.programaService.findOne(createInscripcionprogramaDto.fkidprograma);
      if ( programa === null ) {
        return {
          resp: 0, error: false,
          message: 'Programa no existe.',
        };
      }
      const modalidadAcademica = await this.modalidadAcademicaService.findOne(programa.fkidmodalidadacademica);
      if ( modalidadAcademica === null ) {
        return {
          resp: 0, error: false,
          message: 'Modalidad Academica no existe.',
        };
      }
      const pensum = await this.pensumService.findOne(createInscripcionprogramaDto.fkidpensum);
      if ( pensum === null ) {
        return {
          resp: 0, error: false,
          message: 'Pensum no existe.',
        };
      }
      const estudiante = await this.estudianteService.findOne(createInscripcionprogramaDto.fkidestudiante);
      if ( estudiante === null ) {
        return {
          resp: 0, error: false,
          message: 'Estudiante no existe.',
        };
      }
      const gestionPeriodo = await this.gestionPeriodoService.findOne(createInscripcionprogramaDto.fkidgestionperiodo);
      if ( gestionPeriodo === null ) {
        return {
          resp: 0, error: false,
          message: 'Periodo no existe.',
        };
      }

      const inscripcionProgramaFirst = await this.inscripcionProgramaRepository.findOne( {
        where: {
          gestionperiodo: gestionPeriodo,
          estudiante: estudiante,
          pensum: pensum,
          programa: programa,
        },
      } );

      if ( inscripcionProgramaFirst ) {
        return {
          resp: 0, error: false,
          message: 'Estudiante ya se encuentra actualmente inscrito en este programa.',
        };
      }
      
      const inscripcionPrograma = this.inscripcionProgramaRepository.create( {
        ...createInscripcionprogramaDto,
        unidadadministrativa: unidadAdministrativa,
        unidadacademica: unidadAcademica,
        unidadnegocio: unidadNegocio,
        programa: programa,
        pensum: pensum,
        estudiante: estudiante,
        gestionperiodo: gestionPeriodo,
        modalidadacademica: modalidadAcademica,
        created_at: this.getDateTime(),
      } );
      const inscripcionProgramaStore = await this.inscripcionProgramaRepository.save( inscripcionPrograma );
      return {
        resp: 1, error: false,
        message: 'Inscripción Programa registrado éxitosamente.',
        inscripcionPrograma: inscripcionProgramaStore,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idinscripcionprograma: string) {
    const inscripcionPrograma = await this.inscripcionProgramaRepository.findOneBy( {
      idinscripcionprograma,
    } );
    return inscripcionPrograma;
  }

  async edit(idinscripcionprograma: string) {
    try {
      const inscripcionPrograma = await this.findOne(idinscripcionprograma);
      if ( inscripcionPrograma ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          inscripcionPrograma: inscripcionPrograma,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Inscripción Programa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idinscripcionprograma: string) {
    try {
      const inscripcionPrograma = await this.findOne(idinscripcionprograma);
      if ( inscripcionPrograma ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          inscripcionPrograma: inscripcionPrograma,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Inscripción Programa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idinscripcionprograma: string, updateInscripcionprogramaDto: UpdateInscripcionProgramaDto) {
    const inscripcionPrograma = await this.findOne(idinscripcionprograma);
    if ( inscripcionPrograma === null ) {
      return {
        resp: 0, error: false,
        message: 'Inscripción Programa no existe.',
      };
    }
    const inscripcionProgramaPreLoad = await this.inscripcionProgramaRepository.preload( {
      idinscripcionprograma: idinscripcionprograma,
      ...updateInscripcionprogramaDto,
      concurrencia: inscripcionPrograma.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( inscripcionProgramaPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Inscripción Programa no existe.',
      };
    }
    const inscripcionProgramaUpdate = await this.inscripcionProgramaRepository.save( inscripcionProgramaPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Inscripción Programa actualizado éxitosamente.',
      inscripcionPrograma: inscripcionProgramaUpdate,
    };
  }

  async delete(idinscripcionprograma: string) {
    try {
      let inscripcionPrograma = await this.findOne(idinscripcionprograma);
      if ( inscripcionPrograma === null ) {
        return {
          resp: 0, error: true,
          message: 'Inscripción Programa no existe.',
        };
      }
      await this.inscripcionProgramaRepository.remove( inscripcionPrograma );
      return {
        resp: 1, error: false,
        message: 'Inscripción Programa eliminado éxitosamente.',
        inscripcionPrograma: inscripcionPrograma,
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
