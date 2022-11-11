import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateUnidadAdministrativaDto } from './dto/create-unidadadministrativa.dto';
import { UpdateUnidadAdministrativaDto } from './dto/update-unidadadministrativa.dto';
import { UnidadAdministrativa } from './entities/unidadadministrativa.entity';
import { UnidadAdministrativaTurnoDetalle } from './entities/unidadadministrativaturnodetalle.entity';
import { UnidadAdministrativaAulaDetalle } from './entities/unidadadministrativaauladetalle.entity';

@Injectable()
export class UnidadAdministrativaService {
  private readonly logger = new Logger('UnidadAdministrativaService');

  constructor(
    @InjectRepository(UnidadAdministrativa)
    private readonly unidadAdministrativaRepository: Repository<UnidadAdministrativa>,

    @InjectRepository(UnidadAdministrativaTurnoDetalle)
    private readonly unidadAdministrativaTurnoDetalleRepository: Repository<UnidadAdministrativaTurnoDetalle>,

    @InjectRepository(UnidadAdministrativaAulaDetalle)
    private readonly unidadAdministrativaAulaDetalleRepository: Repository<UnidadAdministrativaAulaDetalle>,

    private readonly dataSource: DataSource,

  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listUnidadAdministrativa = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listUnidadAdministrativa, totalPagination] = await this.unidadAdministrativaRepository.findAndCount( {
          take: limit, skip: offset,
          where: { },
          order: { created_at: "DESC", },
        } );
      } else {
        [listUnidadAdministrativa, totalPagination] = await this.unidadAdministrativaRepository.findAndCount( {
          where: { },
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayUnidadAdministrativa: listUnidadAdministrativa,
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

  async store(createUnidadadministrativaDto: CreateUnidadAdministrativaDto) {
    try {
      const unidadAdministrativa = this.unidadAdministrativaRepository.create( {
        ...createUnidadadministrativaDto,
        created_at: this.getDateTime(),

        arrayturno: createUnidadadministrativaDto.arrayturno?.filter( ( item ) => ( item.fkidturno !== null ) ).map( ( item ) => {
          return this.unidadAdministrativaTurnoDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),

        arrayaula: createUnidadadministrativaDto.arrayaula?.filter( ( item ) => ( item.fkidaula !== null ) ).map( ( item ) => {
          return this.unidadAdministrativaAulaDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),

      } );
      await this.unidadAdministrativaRepository.save( unidadAdministrativa );
      return {
        resp: 1, error: false,
        message: 'Unidad Administrativa registrado éxitosamente.',
        unidadAdministrativa: unidadAdministrativa,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idunidadadministrativa: string) {
    const unidadAdministrativa = await this.unidadAdministrativaRepository.findOne( {
      where: { idunidadadministrativa: idunidadadministrativa },
      relations: { arrayturno: true, arrayaula: true, },
    } );
    return unidadAdministrativa;
  }

  async edit(idunidadadministrativa: string) {
    try {
      const unidadAdministrativa = await this.findOne(idunidadadministrativa);
      if ( unidadAdministrativa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          unidadAdministrativa: unidadAdministrativa,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Unidad Administrativa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idunidadadministrativa: string) {
    try {
      const unidadAdministrativa = await this.findOne(idunidadadministrativa);
      if ( unidadAdministrativa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          unidadAdministrativa: unidadAdministrativa,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Unidad Administrativa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idunidadadministrativa: string, updateUnidadadministrativaDto: UpdateUnidadAdministrativaDto ) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const unidadAdministrativa = await this.findOne(idunidadadministrativa);

      const { arrayaula, arrayturno, ...toUpdate } = updateUnidadadministrativaDto;
      const unidadAdministrativaPreLoad = await this.unidadAdministrativaRepository.preload( {
        idunidadadministrativa: idunidadadministrativa,
        ...toUpdate,
        concurrencia: unidadAdministrativa.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( unidadAdministrativaPreLoad === null || unidadAdministrativa === null ) {
        return {
          resp: 0, error: false,
          message: 'Unidad Administrativa no existe.',
        };
      }

      if ( arrayturno ) {
        await queryRunner.manager.delete( UnidadAdministrativaTurnoDetalle, { fkidunidadadministrativa: { idunidadadministrativa: idunidadadministrativa } } );
        unidadAdministrativaPreLoad.arrayturno = arrayturno.filter( ( item ) => ( item.fkidturno !== null ) ).map( ( item ) => {
          return this.unidadAdministrativaTurnoDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } );
      }

      if ( arrayaula ) {
        await queryRunner.manager.delete( UnidadAdministrativaAulaDetalle, { fkidunidadadministrativa: { idunidadadministrativa: idunidadadministrativa } } );
        unidadAdministrativaPreLoad.arrayaula = arrayaula.filter( ( item ) => ( item.fkidaula !== null ) ).map( ( item ) => {
          return this.unidadAdministrativaAulaDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } );
      }

      const unidadAdministrativaUpdate = await queryRunner.manager.save( unidadAdministrativaPreLoad );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        resp: 1, error: false,
        message: 'Unidad Administrativa actualizado éxitosamente.',
        unidadAdministrativa: unidadAdministrativa,
        unidadAdministrativaUpdate: unidadAdministrativaUpdate,
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

  async delete(idunidadadministrativa: string) {
    try {
      let unidadAdministrativa = await this.findOne(idunidadadministrativa);
      if ( unidadAdministrativa === null ) {
        return {
          resp: 0, error: true,
          message: 'Unidad Administrativa no existe.',
        };
      }
      await this.unidadAdministrativaRepository.remove( unidadAdministrativa );
      return {
        resp: 1, error: false,
        message: 'Unidad Administrativa eliminado éxitosamente.',
        unidadAdministrativa: unidadAdministrativa,
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
