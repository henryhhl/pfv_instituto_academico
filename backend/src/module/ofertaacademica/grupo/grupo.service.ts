import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource, ILike } from 'typeorm';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { PaginationGrupoPensumDto } from './dto/grupopensum-pagination.dto';
import { Grupo } from './entities/grupo.entity';
import { GrupoMateriaDetalle } from './entities/grupomateriadetalle.entity';
import { GrupoMateriaDiaDetalle } from './entities/grupomateriadiadetalle.entity';
import { GrupoMateriaDiaHorarioDetalle } from './entities/grupomateriadiahorario.entity';
import { GrupoMateriaCalificacionDetalle } from './entities/grupomateriacalificacion.entity';
import { DateService } from '../../config/date/date.service';
import { DocenteService } from '../../persona/docente/docente.service';
import { MateriaService } from '../../parametro/materia/materia.service';
import { AulaService } from '../../estructurainstitucional/aula/aula.service';
import { PensumService } from '../../estructuraacademica/pensum/pensum.service';
import { TurnoService } from '../../estructurainstitucional/turno/turno.service';
import { ProgramaService } from '../../estructuraacademica/programa/programa.service';
import { UnidadNegocioService } from '../../parametro/unidadnegocio/unidadnegocio.service';
import { UnidadacademicaService } from '../../estructuraacademica/unidadacademica/unidadacademica.service';
import { GestionPeriodoService } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.service';
import { DivisionAcademicaService } from '../../estructurainstitucional/divisionacademica/divisionacademica.service';
import { UnidadAdministrativaService } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.service';
import { ParametroCalificacionService } from '../../nota/parametrocalificacion/parametrocalificacion.service';

@Injectable()
export class GrupoService {
  private readonly logger = new Logger('GrupoService');

  constructor(
    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>,

    @InjectRepository(GrupoMateriaDetalle)
    private readonly grupoDetalleRepository: Repository<GrupoMateriaDetalle>,

    @InjectRepository(GrupoMateriaDiaDetalle)
    private readonly grupoDiaDetalleRepository: Repository<GrupoMateriaDiaDetalle>,

    @InjectRepository(GrupoMateriaDiaHorarioDetalle)
    private readonly horarioDetalleRepository: Repository<GrupoMateriaDiaHorarioDetalle>,

    @InjectRepository(GrupoMateriaCalificacionDetalle)
    private readonly calificacionDetalleRepository: Repository<GrupoMateriaCalificacionDetalle>,

    private readonly dataSource: DataSource,

    private readonly aulaService: AulaService,
    private readonly dateService: DateService,
    private readonly turnoService: TurnoService,
    private readonly pensumService: PensumService,
    private readonly docenteService: DocenteService,
    private readonly materiaService: MateriaService,
    private readonly programaService: ProgramaService,
    private readonly unidadNegocioService: UnidadNegocioService,
    private readonly gestionPeriodoService: GestionPeriodoService,
    private readonly unidadAcademicaService: UnidadacademicaService,
    private readonly divisionAcademicaService: DivisionAcademicaService,
    private readonly unidadAdministrativaService: UnidadAdministrativaService,
    private readonly parametroCalificacionService: ParametroCalificacionService,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listGrupo = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listGrupo, totalPagination] = await this.grupoRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listGrupo, totalPagination] = await this.grupoRepository.findAndCount( {
          where: [
            { sigla: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayGrupo: listGrupo,
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

  async findAllGrupoForPensum( paginationDto: PaginationGrupoPensumDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listGrupo = [];
      let arrayGrupoPensumMateria = [];
      let totalPagination = 0;

      const pensum = await this.pensumService.findOne(paginationDto.fkidpensum);

      if ( pensum !== null ) {
        arrayGrupoPensumMateria = await this.grupoDetalleRepository.find( {
          where: { pensum: {
            idpensum: pensum.idpensum,
          } },
          relations: { grupo: true, },
        } );
      }
      
      if ( arrayGrupoPensumMateria.length > 0 ) {
        if ( esPaginate ) {
          [listGrupo, totalPagination] = await this.grupoRepository.findAndCount( {
            take: limit, skip: offset * limit,
            where: [
              { arrayGrupoMateriaDetalle: arrayGrupoPensumMateria, },
            ],
            order: { created_at: "DESC", },
          } );
        } else {
          [listGrupo, totalPagination] = await this.grupoRepository.findAndCount( {
            where: [
              { arrayGrupoMateriaDetalle: arrayGrupoPensumMateria, },
            ],
            order: { created_at: "DESC", },
          } );
        }
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayGrupo: listGrupo,
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

  async findAllMateriaForGrupo( paginationDto: PaginationGrupoPensumDto ) {
    try {
      const { fkidpensum = null, fkidgrupo = null, } = paginationDto;
      let listGrupo = [];
      let totalPagination = 0;

      const grupo = await this.findOne( fkidgrupo );
      const pensum = await this.pensumService.findOne(fkidpensum);
      
      if ( pensum !== null && grupo !== null ) {
        console.log('pensum !== null && grupo !== null');
        [listGrupo, totalPagination] = await this.grupoDetalleRepository.findAndCount( {
          select: {
            materia: { idmateria: true, codigo: true, sigla: true, nombrelargo: true, },
            docente: { 
              iddocente: true, nombreprincipal: true, nombreadicional: true, apellidoprimero: true, apellidosegundo: true, 
              numeroidentificacion: true, tipoidentificacion: true,
              arraycategoriadocumento: false, arrayestudio: false, arraymateria: false,
              arraynacionalidad: false, arrayreferenciacontactos: false,
            },
            gestionPeriodo: {
              idgestionperiodo: true, descripcion: true, fechainicio: true, fechafinal: true, 
            },
            created_at: false, updated_at: false, deleted_at: false, isdelete: false, concurrencia: false,
          },
          relations: { materia: true, docente: true, gestionPeriodo: true, },
          where: [
            { 
              pensum: {
                idpensum: paginationDto.fkidpensum,
              }, 
              grupo: {
                idgrupo: paginationDto.fkidgrupo,
              }, 
            },
          ],
          order: { created_at: "ASC", },
        } );
      } else {
        if ( pensum === null && grupo !== null ) {
          console.log('pensum === null && grupo !== null');
          [listGrupo, totalPagination] = await this.grupoDetalleRepository.findAndCount( {
            select: {
              materia: { idmateria: true, codigo: true, sigla: true, nombrelargo: true, },
              created_at: false, updated_at: false, deleted_at: false, isdelete: false, concurrencia: false,
            },
            relations: { materia: true, },
            where: [
              { 
                grupo: {
                  idgrupo: paginationDto.fkidgrupo,
                }, 
              },
            ],
            order: { created_at: "ASC", },
          } );
        }
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayGrupo: listGrupo,
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

  async findAllMateriaForDocente(paginationDto: PaginationGrupoPensumDto) {
    try {
      let listGrupo = [];
      let total = 0;
      const docente = await this.docenteService.findOne(paginationDto.fkiddocente);
      if ( docente != null ) {
        [listGrupo, total] = await this.grupoDetalleRepository.findAndCount( {
          where: {
            docente: { iddocente: paginationDto.fkiddocente, },
          },
          relations: {
            grupo: true,
            arrayGrupoMateriaDiaDetalle: {
              dia: true,
              arrayGrupoMateriaDiaHorario: {
                aula: true,
              },
            },
            materia: true,
            gestionPeriodo: true,
            divisionAcademica: true,
            unidadAdministrativa: true,
            unidadNegocio: true,
            unidadAcademica: true,
            turno: true,
            programa: true,
            pensum: true,
          },
          order: { 
            gestionPeriodo: { created_at: 'DESC', },
            created_at: 'DESC',
            arrayGrupoMateriaDiaDetalle: {
              created_at: 'ASC',
              arrayGrupoMateriaDiaHorario: {
                created_at: 'ASC'
              },
            },
          },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayGrupo: listGrupo,
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

  async store(createGrupoDto: CreateGrupoDto) {
    try {
      const { arraygrupomateriadetalle, ...toCreate } = createGrupoDto;
      const existsGrupo = await this.existsSigla( toCreate.sigla );
      if ( existsGrupo === true ) {
        return {
          resp: 0, error: false,
          message: 'Sigla ya existente, favor ingresar uno nuevo.',
        };
      } 
      const grupoCreate = this.grupoRepository.create( {
        ...toCreate,
        arrayGrupoMateriaDetalle: [],
        created_at: this.getDateTime(),
      } );

      for (let index = 0; index < arraygrupomateriadetalle?.length; index++) {
        const item = arraygrupomateriadetalle[index];
        if ( item.fkidpensum !== null ) {

          const unidadAdministrativa = await this.unidadAdministrativaService.findOne(item.fkidunidadadministrativa);
          const unidadNegocio = await this.unidadNegocioService.findOne(item.fkidunidadnegocio);
          const unidadAcademica = await this.unidadAcademicaService.findOne(item.fkidunidadacademica);
          const programa = await this.programaService.findOne(item.fkidprograma);
          const pensum = await this.pensumService.findOne(item.fkidpensum);
          const docente = await this.docenteService.findOne(item.fkiddocente);
          const turno = await this.turnoService.findOne(item.fkidturno);
          const gestionPeriodo = await this.gestionPeriodoService.findOne(item.fkidgestionperiodo);
          const materia = await this.materiaService.findOne(item.fkidmateria);
          const divisionAcademica = await this.divisionAcademicaService.findOne(item.fkiddivisionacademica);

          const grupoDetalleCreate = this.grupoDetalleRepository.create( {
            unidadAdministrativa: unidadAdministrativa,
            unidadNegocio: unidadNegocio,
            unidadAcademica: unidadAcademica,
            programa: programa,
            pensum: pensum,
            docente: docente,
            turno: turno,
            gestionPeriodo: gestionPeriodo,
            materia: materia,
            divisionAcademica: divisionAcademica,
            cupomaximo: item.cupomaximo,
            arrayGrupoMateriaDiaDetalle: [],
            arrayGrupoMateriaCalificacionDetalle: [],
            created_at: this.getDateTime(),
          } );

          for (let pos = 0; pos < item.arraydia.length; pos++) {
            const element = item.arraydia[pos];
            const dayFirst = await this.dateService.findOneDay(element.iddia);
            
            if ( dayFirst !== null ) {
              const grupoMateriaDiaCreate = this.grupoDiaDetalleRepository.create( {
                dia: dayFirst,
                arrayGrupoMateriaDiaHorario: [],
                created_at: this.getDateTime(),
              } );

              for (let cant = 0; cant < element.arrayhorario.length; cant++) {
                const horario = element.arrayhorario[cant];
                
                const aulaFirst = await this.aulaService.findOne(horario.fkidaula);
                if ( aulaFirst !== null ) {

                  const grupoHorarioCreate = this.horarioDetalleRepository.create( {
                    aula: aulaFirst,
                    horainicio: horario.horainicio,
                    horafinal: horario.horafinal,
                    created_at: this.getDateTime(),
                  } );
                  grupoMateriaDiaCreate.arrayGrupoMateriaDiaHorario = [ ...grupoMateriaDiaCreate.arrayGrupoMateriaDiaHorario, grupoHorarioCreate ];
                }
              }
              grupoDetalleCreate.arrayGrupoMateriaDiaDetalle = [ ...grupoDetalleCreate.arrayGrupoMateriaDiaDetalle, grupoMateriaDiaCreate ];
            }
          }

          if ( Array.isArray(item.arrayparametrocalificacion) ) {
            for (let pos = 0; pos < item.arrayparametrocalificacion.length; pos++) {
              const calificacion = item.arrayparametrocalificacion[pos];
              const parametroCalificacionFirst = await this.parametroCalificacionService.findOne(calificacion.fkidparametrocalificacion);

              if ( parametroCalificacionFirst !== null ) {
                const grupoMateriaCalificacionCreate = this.calificacionDetalleRepository.create( {
                  parametroCalificacion: parametroCalificacionFirst,
                  valorporcentaje: calificacion.valorporcentaje,
                  created_at: this.getDateTime(),
                } );

                grupoDetalleCreate.arrayGrupoMateriaCalificacionDetalle = [ 
                  ...grupoDetalleCreate.arrayGrupoMateriaCalificacionDetalle, 
                  grupoMateriaCalificacionCreate 
                ];
              }
            }
          }

          grupoCreate.arrayGrupoMateriaDetalle = [ ...grupoCreate.arrayGrupoMateriaDetalle, grupoDetalleCreate ];

        }
      }
      const grupoSave = await this.grupoRepository.save( grupoCreate );
      return {
        resp: 1, error: false,
        message: 'Grupo registrado éxitosamente.',
        grupo: grupoSave,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  private async existsSigla(sigla: string) {
    const grupo = await this.grupoRepository.findOne( {
      where: { sigla: sigla, },
      order: { created_at: 'DESC', },
    } );
    return grupo ? true : false;
  }

  async findOne(idgrupo: string) {
    try {
      const grupo = await this.grupoRepository.findOne( {
        where: { idgrupo },
        relations: {
          arrayGrupoMateriaDetalle: {
            divisionAcademica: true,
            docente: {
              arraycategoriadocumento: false,
              arrayestudio: false, arraymateria: false,
              arraynacionalidad: false, arrayreferenciacontactos: false,
            },
            gestionPeriodo: true,
            materia: true,
            pensum: {
              arraydivisionacademica: {
                arraymateria: {
                  materia: true,
                },
                divisionacademica: true,
              }
            },
            programa: {
              arraydivisionacademica: false,
            },
            turno: true,
            unidadAcademica: true,
            unidadAdministrativa: {
              arrayaula: false, arrayturno: false,
            },
            unidadNegocio: true,
            arrayGrupoMateriaDiaDetalle: {
              dia: true,
              arrayGrupoMateriaDiaHorario: {
                aula: true,
              },
            },
            arrayGrupoMateriaCalificacionDetalle: {
              parametroCalificacion: true,
            },
          },
        },
        order: {
          arrayGrupoMateriaDetalle: {
            arrayGrupoMateriaDiaDetalle: {
              created_at: 'ASC',
              arrayGrupoMateriaDiaHorario: {
                created_at: 'ASC',
              },
            },
            arrayGrupoMateriaCalificacionDetalle: {
              created_at: 'ASC',
            },
          },
        },
      } );
      return grupo;
    } catch (error) {
      return null;
    }
  }

  async findOneDetail(idgrupomateriadetalle: number) {
    try {
      return await this.grupoDetalleRepository.findOne( {
        where: { idgrupopensumdetalle: idgrupomateriadetalle, },
        relations: { 
          arrayGrupoMateriaDiaDetalle: {
            dia: true,
            arrayGrupoMateriaDiaHorario: true,
          }, 
          arrayGrupoMateriaCalificacionDetalle: {
            parametroCalificacion: true,
          },
        },
        order: {
          arrayGrupoMateriaCalificacionDetalle: {
            created_at: 'ASC',
          },
          arrayGrupoMateriaDiaDetalle: {
            created_at: 'ASC',
            arrayGrupoMateriaDiaHorario: {
              created_at: 'ASC',
            },
          },
        },
      } );
    } catch (error) {
      return null;
    }
  }

  async edit(idgrupo: string) {
    try {
      const grupo = await this.findOne(idgrupo);
      if ( grupo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          grupo: grupo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Grupo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idgrupo: string) {
    try {
      const grupo = await this.findOne(idgrupo);
      if ( grupo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          grupo: grupo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Grupo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idgrupo: string, updateGrupoDto: UpdateGrupoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const grupo = await this.findOne(idgrupo);
      if ( grupo === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Grupo no existe.',
        };
      }

      if ( grupo.sigla !== updateGrupoDto.sigla ) {
        const existsGrupo = await this.existsSigla( updateGrupoDto.sigla );
        if ( existsGrupo === true ) {
          await queryRunner.rollbackTransaction();
          await queryRunner.release();
          return {
            resp: 0, error: false,
            message: 'Sigla ya existente, favor ingresar uno nuevo.',
          };
        } 
      }

      const { arraygrupomateriadetalle, ...toUpdate } = updateGrupoDto;
      const grupoPreLoad = await this.grupoRepository.preload( {
        idgrupo: idgrupo,
        ...toUpdate,
        concurrencia: grupo.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( grupoPreLoad === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Grupo no existe.',
        };
      }
      if ( arraygrupomateriadetalle ) {
        await queryRunner.manager.delete( GrupoMateriaDetalle, { grupo: { idgrupo: idgrupo } } );

        grupoPreLoad.arrayGrupoMateriaDetalle = [];
        for (let index = 0; index < arraygrupomateriadetalle?.length; index++) {
          const item = arraygrupomateriadetalle[index];
          if ( item.fkidpensum !== null ) {

            const unidadAdministrativa = await this.unidadAdministrativaService.findOne(item.fkidunidadadministrativa);
            const unidadNegocio = await this.unidadNegocioService.findOne(item.fkidunidadnegocio);
            const unidadAcademica = await this.unidadAcademicaService.findOne(item.fkidunidadacademica);
            const programa = await this.programaService.findOne(item.fkidprograma);
            const pensum = await this.pensumService.findOne(item.fkidpensum);
            const docente = await this.docenteService.findOne(item.fkiddocente);
            const turno = await this.turnoService.findOne(item.fkidturno);
            const gestionPeriodo = await this.gestionPeriodoService.findOne(item.fkidgestionperiodo);
            const materia = await this.materiaService.findOne(item.fkidmateria);
            const divisionAcademica = await this.divisionAcademicaService.findOne(item.fkiddivisionacademica);

            const grupoDetalleCreate = this.grupoDetalleRepository.create( {
              unidadAdministrativa: unidadAdministrativa,
              unidadNegocio: unidadNegocio,
              unidadAcademica: unidadAcademica,
              programa: programa,
              pensum: pensum,
              docente: docente,
              turno: turno,
              gestionPeriodo: gestionPeriodo,
              materia: materia,
              divisionAcademica: divisionAcademica,
              cupomaximo: item.cupomaximo,
              arrayGrupoMateriaDiaDetalle: [],
              arrayGrupoMateriaCalificacionDetalle: [],
              created_at: this.getDateTime(),
            } );

            for (let pos = 0; pos < item.arraydia.length; pos++) {
              const element = item.arraydia[pos];
              const dayFirst = await this.dateService.findOneDay(element.iddia);
              
              if ( dayFirst !== null ) {
                const grupoMateriaDiaCreate = this.grupoDiaDetalleRepository.create( {
                  dia: dayFirst,
                  arrayGrupoMateriaDiaHorario: [],
                  created_at: this.getDateTime(),
                } );
  
                for (let cant = 0; cant < element.arrayhorario.length; cant++) {
                  const horario = element.arrayhorario[cant];
                  
                  const aulaFirst = await this.aulaService.findOne(horario.fkidaula);
                  if ( aulaFirst !== null ) {
  
                    const grupoHorarioCreate = this.horarioDetalleRepository.create( {
                      aula: aulaFirst,
                      horainicio: horario.horainicio,
                      horafinal: horario.horafinal,
                      created_at: this.getDateTime(),
                    } );
                    grupoMateriaDiaCreate.arrayGrupoMateriaDiaHorario = [ ...grupoMateriaDiaCreate.arrayGrupoMateriaDiaHorario, grupoHorarioCreate ];
                  }
                }
                grupoDetalleCreate.arrayGrupoMateriaDiaDetalle = [ ...grupoDetalleCreate.arrayGrupoMateriaDiaDetalle, grupoMateriaDiaCreate ];
              }
            }

            if ( Array.isArray(item.arrayparametrocalificacion) ) {
              for (let pos = 0; pos < item.arrayparametrocalificacion.length; pos++) {
                const calificacion = item.arrayparametrocalificacion[pos];
                const parametroCalificacionFirst = await this.parametroCalificacionService.findOne(calificacion.fkidparametrocalificacion);
  
                if ( parametroCalificacionFirst !== null ) {
                  const grupoMateriaCalificacionCreate = this.calificacionDetalleRepository.create( {
                    parametroCalificacion: parametroCalificacionFirst,
                    valorporcentaje: calificacion.valorporcentaje,
                    created_at: this.getDateTime(),
                  } );
  
                  grupoDetalleCreate.arrayGrupoMateriaCalificacionDetalle = [ 
                    ...grupoDetalleCreate.arrayGrupoMateriaCalificacionDetalle, 
                    grupoMateriaCalificacionCreate 
                  ];
                }
              }
            }
  
            grupoPreLoad.arrayGrupoMateriaDetalle = [ ...grupoPreLoad.arrayGrupoMateriaDetalle, grupoDetalleCreate ];
          }
        }
      }

      const grupoUpdate = await queryRunner.manager.save( grupoPreLoad );
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        resp: 1,
        error: false,
        message: 'Grupo actualizado éxitosamente.',
        grupo: grupoUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idgrupo: string) {
    try {
      let grupo = await this.findOne(idgrupo);
      if ( grupo === null ) {
        return {
          resp: 0, error: true,
          message: 'Grupo no existe.',
        };
      }
      await this.grupoRepository.remove( grupo );
      return {
        resp: 1, error: false,
        message: 'Grupo eliminado éxitosamente.',
        grupo: grupo,
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
