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

@Injectable()
export class CursoService {
  private readonly logger = new Logger('CursoService');

  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,

    @InjectRepository(CursoDocenteDetalle)
    private readonly cursoDocenteDetalleRepository: Repository<CursoDocenteDetalle>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listCurso = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listCurso, totalPagination] = await this.cursoRepository.findAndCount( {
          relations: { arraydocente: true, },
          take: limit, skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
            { materia: ILike( '%' + search + '%', ), },
            { turno: ILike( '%' + search + '%', ), },
            { modalidadacademica: ILike( '%' + search + '%', ), },
            { gestionperiodo: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listCurso, totalPagination] = await this.cursoRepository.findAndCount( {
          relations: { arraydocente: true, },
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
            { materia: ILike( '%' + search + '%', ), },
            { turno: ILike( '%' + search + '%', ), },
            { modalidadacademica: ILike( '%' + search + '%', ), },
            { gestionperiodo: ILike( '%' + search + '%', ), },
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
      const curso = this.cursoRepository.create( {
        ...toCreate,
        arraydocente: arraydocente?.filter( 
          ( item ) => ( item.fkiddocente !== null ) 
        ).map( ( item ) => {
          return this.cursoDocenteDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),
        created_at: this.getDateTime(),
      } );
      await this.cursoRepository.save( curso );
      return {
        resp: 1, error: false,
        message: 'Curso registrado éxitosamente.',
        curso: curso,
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
          arraydocente: true,
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
        ...toUpdate,
        concurrencia: curso.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( cursoPreLoad === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Curso no existe.',
        };
      }
      if ( arraydocente ) {
        await queryRunner.manager.delete( CursoDocenteDetalle, { fkidcurso: { idcurso: idcurso } } );
        cursoPreLoad.arraydocente = arraydocente.filter( 
          ( item ) => ( item.fkiddocente !== null ) 
        ).map( ( item ) => {
          return this.cursoDocenteDetalleRepository.create( {
            ...item,
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
        ...updateAperturaCierreDto,
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
