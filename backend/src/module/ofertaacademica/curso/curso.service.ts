import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource, ILike } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { UpdateCierreCursoDto } from './dto/update-cierre.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CursoDocenteDetalle } from './entities/cursodocentedetalle.entity';
import { UpdateAperturaCierreCursoDto } from './dto/update-aperturacierre.dto';
import { CursoParametroCalificacion } from './entities/cursoparametrocalificacion.entity';
import { MateriaForDocenteCursoDto } from './dto/materia-docente.dto';
import { DocenteService } from '../../persona/docente/docente.service';

@Injectable()
export class CursoService {
  private readonly logger = new Logger('CursoService');

  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,

    @InjectRepository(CursoDocenteDetalle)
    private readonly cursoDocenteDetalleRepository: Repository<CursoDocenteDetalle>,

    @InjectRepository(CursoParametroCalificacion)
    private readonly cursoParametroCalificacionRepository: Repository<CursoParametroCalificacion>,

    private readonly dataSource: DataSource,

    private readonly docenteService: DocenteService,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listCurso = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listCurso, totalPagination] = await this.cursoRepository.findAndCount( {
          relations: { 
            unidadNegocio: true, unidadAdministrativa: true, unidadAcademica: true,
            materia: true, gestionPeriodo: true, turno: true,
            administrativo: true, motivoAperturaCierreCurso: true,
            arraydocente: { docente: true, }, modalidadAcademica: true, 
          },
          take: limit, skip: offset * limit,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
            { materia: { nombrelargo: ILike( '%' + search + '%', ), }, },
            { turno: { descripcion: ILike( '%' + search + '%', ), }, },
            { modalidadAcademica: { descripcion: ILike( '%' + search + '%', ), }  },
            { gestionPeriodo: { descripcion: ILike( '%' + search + '%', ) }, },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listCurso, totalPagination] = await this.cursoRepository.findAndCount( {
          relations: { 
            unidadNegocio: true, unidadAdministrativa: true, unidadAcademica: true,
            materia: true, gestionPeriodo: true, turno: true,
            administrativo: true, motivoAperturaCierreCurso: true,
            arraydocente: { docente: true, }, modalidadAcademica: true, 
          },
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
            { materia: { nombrelargo: ILike( '%' + search + '%', ), }, },
            { turno: { descripcion: ILike( '%' + search + '%', ), }, },
            { modalidadAcademica: { descripcion: ILike( '%' + search + '%', ), }  },
            { gestionPeriodo: { descripcion: ILike( '%' + search + '%', ) }, },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayCurso: listCurso,
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

  async findAllMateriaForDocente(paginationDto: MateriaForDocenteCursoDto) {
    try {
      let list = [];
      let total = 0;
      const docente = await this.docenteService.findOne(paginationDto.fkiddocente);
      if ( docente != null ) {

        [list, total] = await this.cursoRepository.findAndCount( {
          where: {
            arraydocente: {
              docente: { iddocente: paginationDto.fkiddocente, }
            },
          },
          relations: {
            materia: true, gestionPeriodo: true, turno: true,
            modalidadAcademica: true, unidadAcademica: true, unidadAdministrativa: true,
          },
          order: { 
            gestionPeriodo: { created_at: 'DESC', },
            created_at: 'DESC',
          },
        } );

      }

      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayMateria: list,
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
    milliSeconds = (+milliSeconds < 10) ? "00" + milliSeconds : ( +milliSeconds < 100 ) ? "0" + milliSeconds : milliSeconds ;

    return `${year}-${month}-${day} ${hour}:${minutes}:${segundos}:${milliSeconds}`;
  }

  async store( createCursoDto: CreateCursoDto ) {
    try {
      const { arraydocente, ...toCreate } = createCursoDto;
      const existsCurso = await this.existsSigla( toCreate.sigla );
      if ( existsCurso === true ) {
        return {
          resp: 0, error: false,
          message: 'Sigla ya existente, favor ingresar uno nuevo.',
        };
      } 
      const cursoCreate = this.cursoRepository.create( {
        unidadNegocio: {
          idunidadnegocio: toCreate.fkidunidadnegocio,
        },
        unidadAdministrativa: {
          idunidadadministrativa: toCreate.fkidunidadadministrativa,
        },
        unidadAcademica: {
          idunidadacademica: toCreate.fkidunidadacademica,
        },
        sigla: toCreate.sigla,
        descripcion: toCreate.descripcion,
        modalidadAcademica: {
          idmodalidadacademica: toCreate.fkidmodalidadacademica,
        },
        materia: {
          idmateria: toCreate.fkidmateria,
        },
        turno: {
          idturno: toCreate.fkidturno,
        },
        cupo: toCreate.cupo,
        gestionPeriodo: {
          idgestionperiodo: toCreate.fkidgestionperiodo,
        },
        aula: {
          idaula: toCreate.fkidaula,
        },
        fechainicio: toCreate.fechainicio,
        fechafinal: toCreate.fechafinal,
        horainicio: toCreate.horainicio,
        horafinal: toCreate.horafinal,
        cantidadhora: toCreate.cantidadhora,
        inversionbase: toCreate.inversionbase,
        prerequisito: toCreate.prerequisito,
        objetivo: toCreate.objetivo,
        arraydocente: arraydocente?.filter( 
          ( item ) => ( item.fkiddocente !== null ) 
        ).map( ( item ) => {
          return this.cursoDocenteDetalleRepository.create( {
            docente: {
              iddocente: item.fkiddocente,
            },
            contenido: item.contenido,
            estado: item.estado,
            created_at: this.getDateTime(),
          } );
        } ),
        created_at: this.getDateTime(),
        arrayCursoParametroCalificacion: [],
      } );
      
      if ( Array.isArray(toCreate.arrayparametrocalificacion) ) {
        for (let pos = 0; pos < toCreate.arrayparametrocalificacion.length; pos++) {
          const calificacion = toCreate.arrayparametrocalificacion[pos];
          const cursoCalificacionCreate = this.cursoParametroCalificacionRepository.create( {
            parametroCalificacion: {
              idparametrocalificacion: calificacion.fkidparametrocalificacion,
            },
            valorporcentaje: calificacion.valorporcentaje,
            created_at: this.getDateTime(),
          } );
          cursoCreate.arrayCursoParametroCalificacion = [ ...cursoCreate.arrayCursoParametroCalificacion, cursoCalificacionCreate ];
        }
      }


      await this.cursoRepository.save( cursoCreate );
      return {
        resp: 1, error: false,
        message: 'Curso registrado éxitosamente.',
        curso: cursoCreate,
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
    const curso = await this.cursoRepository.findOne( {
      where: { sigla: sigla, },
      order: { created_at: 'DESC', },
    } );
    return curso ? true : false;
  }

  async findOne(idcurso: string) {
    try {
      const curso = await this.cursoRepository.findOne( {
        where: { idcurso: idcurso },
        relations: {
          unidadAcademica: true, unidadAdministrativa: true, unidadNegocio: true,
          modalidadAcademica: true, materia: true, turno: true, aula: true,
          gestionPeriodo: true, motivoAperturaCierreCurso: true, administrativo: true,
          arraydocente: {
            docente: true,
          },
          arrayCursoParametroCalificacion: {
            parametroCalificacion: true,
          },
        }
      } );
      return curso;
    } catch (error) {
      return null;
    }
  }

  async edit(idcurso: string) {
    try {
      const curso = await this.findOne(idcurso);
      if ( curso ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          curso: curso,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Curso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idcurso: string) {
    try {
      const curso = await this.findOne(idcurso);
      if ( curso ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          curso: curso,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Curso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idcurso: string, updateCursoDto: UpdateCursoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const curso = await this.findOne(idcurso);
      if ( curso === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Curso no existe.',
        };
      }
      if ( curso.sigla !== updateCursoDto.sigla ) {
        const existsCurso = await this.existsSigla( updateCursoDto.sigla );
        if ( existsCurso === true ) {
          await queryRunner.rollbackTransaction();
          await queryRunner.release();
          return {
            resp: 0, error: false,
            message: 'Sigla ya existente, favor ingresar uno nuevo.',
          };
        } 
      }
      const { arraydocente, ...toUpdate } = updateCursoDto;
      const cursoPreLoad = await this.cursoRepository.preload( {
        idcurso: idcurso,
        unidadNegocio: {
          idunidadnegocio: toUpdate.fkidunidadnegocio,
        },
        unidadAdministrativa: {
          idunidadadministrativa: toUpdate.fkidunidadadministrativa,
        },
        unidadAcademica: {
          idunidadacademica: toUpdate.fkidunidadacademica,
        },
        sigla: toUpdate.sigla,
        descripcion: toUpdate.descripcion,
        modalidadAcademica: {
          idmodalidadacademica: toUpdate.fkidmodalidadacademica,
        },
        materia: {
          idmateria: toUpdate.fkidmateria,
        },
        turno: {
          idturno: toUpdate.fkidturno,
        },
        cupo: toUpdate.cupo,
        gestionPeriodo: {
          idgestionperiodo: toUpdate.fkidgestionperiodo,
        },
        aula: {
          idaula: toUpdate.fkidaula,
        },
        horainicio: toUpdate.horainicio,
        horafinal: toUpdate.horafinal,
        fechainicio: toUpdate.fechainicio,
        fechafinal: toUpdate.fechafinal,
        cantidadhora: toUpdate.cantidadhora,
        inversionbase: toUpdate.inversionbase,
        prerequisito: toUpdate.prerequisito,
        objetivo: toUpdate.objetivo,
        arrayCursoParametroCalificacion: [],
        concurrencia: curso.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( Array.isArray(toUpdate.arrayparametrocalificacion) ) {
        await queryRunner.manager.delete( CursoParametroCalificacion, { curso: { idcurso: idcurso } } );
        for (let pos = 0; pos < toUpdate.arrayparametrocalificacion.length; pos++) {
          const calificacion = toUpdate.arrayparametrocalificacion[pos];
          const cursoCalificacionCreate = this.cursoParametroCalificacionRepository.create( {
            parametroCalificacion: {
              idparametrocalificacion: calificacion.fkidparametrocalificacion,
            },
            valorporcentaje: calificacion.valorporcentaje,
            created_at: this.getDateTime(),
          } );
          cursoPreLoad.arrayCursoParametroCalificacion = [ ...cursoPreLoad.arrayCursoParametroCalificacion, cursoCalificacionCreate ];
        }
      }

      if ( cursoPreLoad === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Curso no existe.',
        };
      }
      if ( arraydocente ) {
        await queryRunner.manager.delete( CursoDocenteDetalle, { curso: { idcurso: idcurso } } );
        cursoPreLoad.arraydocente = arraydocente.filter( 
          ( item ) => ( item.fkiddocente !== null ) 
        ).map( ( item ) => {
          return this.cursoDocenteDetalleRepository.create( {
            docente: {
              iddocente: item.fkiddocente,
            },
            contenido: item.contenido,
            estado: item.estado,
            created_at: this.getDateTime(),
          } );
        } );
      }
      const cursoUpdate = await queryRunner.manager.save( cursoPreLoad );
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        resp: 1, error: false,
        message: 'Curso actualizado éxitosamente.',
        curso: cursoUpdate,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idcurso: string) {
    try {
      let curso = await this.findOne(idcurso);
      if ( curso === null ) {
        return {
          resp: 0, error: true,
          message: 'Curso no existe.',
        };
      }
      await this.cursoRepository.remove( curso );
      return {
        resp: 1, error: false,
        message: 'Curso eliminado éxitosamente.',
        curso: curso,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async aperturarcerrarcurso(idcurso: string, updateAperturaCierreDto: UpdateAperturaCierreCursoDto) {
    try {
      const curso = await this.findOne(idcurso);
      if ( curso === null ) {
        return {
          resp: 0, error: false,
          message: 'Curso no existe.',
        };
      }
      const cursoPreLoad = await this.cursoRepository.preload( {
        idcurso: idcurso,
        motivoAperturaCierreCurso: {
          idmotivoaperturacierrecurso: updateAperturaCierreDto.fkidmotivoaperturacierrecurso,
        },
        administrativo: {
          idadministrativo: updateAperturaCierreDto.fkidadministrativo,
        },
        observaciones: updateAperturaCierreDto.observaciones,
        fechaoperacion: updateAperturaCierreDto.fechaoperacion,
        estadoproceso: updateAperturaCierreDto.estadoproceso,
        concurrencia: curso.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( cursoPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Curso no existe.',
        };
      }
      const cursoUpdate = await this.cursoRepository.save( cursoPreLoad );
      let message = "";
      if ( updateAperturaCierreDto.estadoproceso === "A" ) {
        message = "Aperturado";
      } else if ( updateAperturaCierreDto.estadoproceso === "C" ) {
        message = "Cerrado";
      }
      return {
        resp: 1,
        error: false,
        message: `Curso ${message} éxitosamente.`,
        curso: cursoUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async cierrecurso(idcurso: string, updateCierreDto: UpdateCierreCursoDto) {
    try {
      const curso = await this.findOne(idcurso);
      if ( curso === null ) {
        return {
          resp: 0, error: false,
          message: 'Curso no existe.',
        };
      }
      const cursoPreLoad = await this.cursoRepository.preload( {
        idcurso: idcurso,
        ...updateCierreDto,
        estadoproceso: 'C',
        concurrencia: curso.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( cursoPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Curso no existe.',
        };
      }
      const cursoUpdate = await this.cursoRepository.save( cursoPreLoad );
      return {
        resp: 1,
        error: false,
        message: `Curso Cerrado éxitosamente.`,
        curso: cursoUpdate,
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
