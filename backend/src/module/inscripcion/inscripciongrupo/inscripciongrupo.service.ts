import { Injectable, Logger } from '@nestjs/common';
import { CreateInscripcionGrupoDto } from './dto/create-inscripciongrupo.dto';
import { UpdateInscripcionGrupoDto } from './dto/update-inscripciongrupo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InscripcionGrupo } from './entities/inscripciongrupo.entity';
import { Repository } from 'typeorm';
import { UnidadAdministrativaService } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.service';
import { UnidadacademicaService } from '../../estructuraacademica/unidadacademica/unidadacademica.service';
import { GestionPeriodoService } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.service';
import { UnidadNegocioService } from '../../parametro/unidadnegocio/unidadnegocio.service';
import { EstudianteService } from '../../persona/estudiante/estudiante.service';
import { ProgramaService } from '../../estructuraacademica/programa/programa.service';
import { PensumService } from '../../estructuraacademica/pensum/pensum.service';
import { MateriaService } from '../../parametro/materia/materia.service';
import { GrupoService } from '../../ofertaacademica/grupo/grupo.service';
import { InscripcionGrupoPaginationDto } from './dto/pagination.dto';

@Injectable()
export class InscripcionGrupoService {
  private readonly logger = new Logger('InscripcionGrupoService');

  constructor(
    @InjectRepository(InscripcionGrupo)
    private readonly inscripcionGrupoRepository: Repository<InscripcionGrupo>,

    private readonly grupoService: GrupoService,
    private readonly pensumService: PensumService,
    private readonly materiaService: MateriaService,
    private readonly programaService: ProgramaService,
    private readonly estudianteService: EstudianteService,
    private readonly unidadNegocioService: UnidadNegocioService,
    private readonly gestionPeriodoService: GestionPeriodoService,
    private readonly unidadAcademicaService: UnidadacademicaService,
    private readonly unidadAdministrativaService: UnidadAdministrativaService,
  ) {}

  async findAll( paginationDto: InscripcionGrupoPaginationDto ) {
    try {
      const { 
        limit = 1, offset = 0, search = "", fkidgrupo = null, 
        fkidmateria = null, fkidgestionperiodo = null, esPaginate = false, 
      } = paginationDto;
      
      let listInscripcionGrupo = [];
      let totalPagination = 0;
      
      const grupo = await this.grupoService.findOne(fkidgrupo);
      const materia = await this.materiaService.findOne(fkidmateria);
      const gestionPeriodo = await this.gestionPeriodoService.findOne(fkidgestionperiodo);

      if ( esPaginate ) {
        [listInscripcionGrupo, totalPagination] = await this.inscripcionGrupoRepository.findAndCount( {
          take: limit, skip: offset,
          relations: {
            estudiante: true, gestionperiodo: true,
          },
          where: [
            // { fechainscripcion: ILike( '%' + search + '%', ), },
            { grupo: grupo, materia: materia, gestionperiodo: gestionPeriodo },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listInscripcionGrupo, totalPagination] = await this.inscripcionGrupoRepository.findAndCount( {
          relations: {
            estudiante: true, gestionperiodo: true,
          },
          where: [
            // { fechainscripcion: ILike( '%' + search + '%', ), },
            { grupo: grupo, materia: materia, gestionperiodo: gestionPeriodo },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayInscripcionGrupo: listInscripcionGrupo,
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

  async store(createInscripciongrupoDto: CreateInscripcionGrupoDto) {
    try {
      const unidadAdministrativa = await this.unidadAdministrativaService.findOne(createInscripciongrupoDto.fkidunidadadministrativa);
      if ( unidadAdministrativa === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Administrativa no existe.',
        };
      }
      const unidadAcademica = await this.unidadAcademicaService.findOne(createInscripciongrupoDto.fkidunidadacademica);
      if ( unidadAcademica === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Academica no existe.',
        };
      }
      const unidadNegocio = await this.unidadNegocioService.findOne(createInscripciongrupoDto.fkidunidadnegocio);
      if ( unidadNegocio === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Negocio no existe.',
        };
      }
      const estudiante = await this.estudianteService.findOne(createInscripciongrupoDto.fkidestudiante);
      if ( estudiante === null ) {
        return {
          resp: 0, error: false,
          message: 'Estudiante no existe.',
        };
      }
      const gestionPeriodo = await this.gestionPeriodoService.findOne(createInscripciongrupoDto.fkidgestionperiodo);
      if ( gestionPeriodo === null ) {
        return {
          resp: 0, error: false,
          message: 'Periodo no existe.',
        };
      }
      const pensum = await this.pensumService.findOne(createInscripciongrupoDto.fkidpensum);
      if ( pensum === null ) {
        return {
          resp: 0, error: false,
          message: 'Pensum no existe.',
        };
      }
      const grupo = await this.grupoService.findOne(createInscripciongrupoDto.fkidgrupo);
      if ( grupo === null ) {
        return {
          resp: 0, error: false,
          message: 'Grupo no existe.',
        };
      }
      const materia = await this.materiaService.findOne(createInscripciongrupoDto.fkidmateria);
      if ( materia === null ) {
        return {
          resp: 0, error: false,
          message: 'Materia no existe.',
        };
      }
      const programa = await this.programaService.findOne(createInscripciongrupoDto.fkidprograma);
      if ( programa === null ) {
        return {
          resp: 0, error: false,
          message: 'Programa no existe.',
        };
      }
      const inscripcionGrupoFirst = await this.inscripcionGrupoRepository.findOne( {
        where: {
          pensum: pensum,
          materia: materia,
          grupo: grupo,
          estudiante: estudiante,
          gestionperiodo: gestionPeriodo,
        },
      } );
      if ( inscripcionGrupoFirst ) {
        return {
          resp: 0, error: false,
          message: 'Estudiante ya se encuentra actualmente inscrito en esta materia y grupo.',
        };
      }
      const inscripcionGrupo = this.inscripcionGrupoRepository.create( {
        ...createInscripciongrupoDto,
        unidadadministrativa: unidadAdministrativa,
        unidadacademica: unidadAcademica,
        unidadnegocio: unidadNegocio,
        estudiante: estudiante,
        gestionperiodo: gestionPeriodo,
        pensum: pensum,
        grupo: grupo,
        materia: materia,
        programa: programa,
        created_at: this.getDateTime(),
      } );
      const inscripcionGrupoStore = await this.inscripcionGrupoRepository.save( inscripcionGrupo );
      return {
        resp: 1, error: false,
        message: 'Inscripción Grupo registrado éxitosamente.',
        inscripcionGrupo: inscripcionGrupoStore,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idinscripciongrupo: string) {
    const inscripcionGrupo = await this.inscripcionGrupoRepository.findOneBy( {
      idinscripciongrupo,
    } );
    return inscripcionGrupo;
  }

  async edit(idinscripciongrupo: string) {
    try {
      const inscripcionGrupo = await this.findOne(idinscripciongrupo);
      if ( inscripcionGrupo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          inscripcionGrupo: inscripcionGrupo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Inscripción Grupo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idinscripciongrupo: string) {
    try {
      const inscripcionGrupo = await this.findOne(idinscripciongrupo);
      if ( inscripcionGrupo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          inscripcionGrupo: inscripcionGrupo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Inscripción Grupo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idinscripciongrupo: string, updateInscripciongrupoDto: UpdateInscripcionGrupoDto) {
    return `This action updates a #${idinscripciongrupo} inscripciongrupo`;
  }

  async delete(idinscripciongrupo: string) {
    try {
      let inscripcionGrupo = await this.findOne(idinscripciongrupo);
      if ( inscripcionGrupo === null ) {
        return {
          resp: 0, error: true,
          message: 'Inscripción Grupo no existe.',
        };
      }
      const inscripcionGrupoDelete = await this.inscripcionGrupoRepository.remove( inscripcionGrupo );
      return {
        resp: 1, error: false,
        message: 'Inscripción Grupo eliminado éxitosamente.',
        inscripcionGrupo: inscripcionGrupoDelete,
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
