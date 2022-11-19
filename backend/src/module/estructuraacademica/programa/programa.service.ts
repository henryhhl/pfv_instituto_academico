
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Programa } from './entities/programa.entity';
import { ProgramaDivisionAcademicaDetalle } from './entities/programadivisionacademicadetalle.entity';
import { ProgramaDivisionAcademicaMateriaDetalle } from './entities/programadivisionacademicamateriadetalle.entity';

@Injectable()
export class ProgramaService {
  private readonly logger = new Logger('ProgramaService');

  constructor(
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,

    @InjectRepository(ProgramaDivisionAcademicaDetalle)
    private readonly programaDivisionAcademicaDetalleRepository: Repository<ProgramaDivisionAcademicaDetalle>,

    @InjectRepository(ProgramaDivisionAcademicaMateriaDetalle)
    private readonly programaDivisionAcademicaMateriaDetalleRepository: Repository<ProgramaDivisionAcademicaMateriaDetalle>,

    private readonly dataSource: DataSource,

  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listPrograma = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listPrograma, totalPagination] = await this.programaRepository.findAndCount( {
          take: limit,
          skip: offset,
          where: { },
          order: {
            created_at: "DESC",
          },
        } );
      } else {
        [listPrograma, totalPagination] = await this.programaRepository.findAndCount( {
          where: { },
          order: {
            created_at: "DESC",
          },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayPrograma: listPrograma,
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

  async store(createProgramaDto: CreateProgramaDto) {
    try {
      const programa = this.programaRepository.create( {
        ...createProgramaDto,
        arraydivisionacademica: createProgramaDto.arraydivisionacademica?.filter( 
          ( item ) => ( item.fkiddivisionacademica !== null ) 
        ).map( ( divisionAcademica ) => {
          const { idprogramadivisionacademicadetalle, ...toCreate } = divisionAcademica;
          return this.programaDivisionAcademicaDetalleRepository.create( {
            ...toCreate,
            arraymateria: divisionAcademica.arraymateria?.filter( 
              ( item ) => ( item.fkidmateria !== null ) 
            ).map( ( materia ) => {
              return this.programaDivisionAcademicaMateriaDetalleRepository.create( {
                ...materia,
                created_at: this.getDateTime(),
              } );
            } ),
            created_at: this.getDateTime(),
          } );
        } ),
        created_at: this.getDateTime(),
      } );
      await this.programaRepository.save( programa );
      return {
        resp: 1, error: false,
        message: 'Programa registrado éxitosamente.',
        programa: programa,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idprograma: string) {
    const programa = await this.programaRepository.findOne( {
      where: { idprograma: idprograma },
      relations: { arraydivisionacademica: true, }
    } );
    return programa;
  }

  async edit(idprograma: string) {
    try {
      const programa = await this.findOne(idprograma);
      if ( programa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          programa: programa,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Programa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idprograma: string) {
    try {
      const programa = await this.findOne(idprograma);
      if ( programa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          programa: programa,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Programa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idprograma: string, updateProgramaDto: UpdateProgramaDto ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const programa = await this.findOne(idprograma);
      if ( programa === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Programa no existe.',
        };
      }
      const { arraydivisionacademica, ...toUpdate } = updateProgramaDto;
      const programaPreLoad = await this.programaRepository.preload( {
        idprograma: idprograma,
        ...toUpdate,
        concurrencia: programa.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );
      if ( programaPreLoad === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Programa no existe.',
        };
      }
      if ( arraydivisionacademica ) {
        programa.arraydivisionacademica.map( async (divisionAcademica) => {
          await queryRunner.manager.delete( ProgramaDivisionAcademicaMateriaDetalle, { 
            fkidprogramadivisionacademicadetalle: { idprogramadivisionacademicadetalle: divisionAcademica.idprogramadivisionacademicadetalle } 
          } );
        } );
        await queryRunner.manager.delete( ProgramaDivisionAcademicaDetalle, { fkidprograma: { idprograma: idprograma } } );
        programaPreLoad.arraydivisionacademica = arraydivisionacademica.map( ( item ) => {
          return this.programaDivisionAcademicaDetalleRepository.create( {
            ...item,
            arraymateria: item.arraymateria?.filter( 
              ( item ) => ( item.fkidmateria !== null ) 
            ).map( ( materia ) => {
              return this.programaDivisionAcademicaMateriaDetalleRepository.create( {
                ...materia,
                created_at: this.getDateTime(),
              } );
            } ),
            created_at: this.getDateTime(),
          } );
        } );
      }
      const programaUpdate = await queryRunner.manager.save( programaPreLoad );
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        resp: 1,
        error: false,
        message: 'Programa actualizado éxitosamente.',
        programa: programa,
        programaUpdate: programaUpdate,
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

  async delete( idprograma: string ) {
    try {
      let programa = await this.findOne(idprograma);
      if ( programa === null ) {
        return {
          resp: 0, error: true,
          message: 'Programa no existe.',
        };
      }
      await this.programaRepository.remove( programa );
      return {
        resp: 1, error: false,
        message: 'Programa eliminado éxitosamente.',
        programa: programa,
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
