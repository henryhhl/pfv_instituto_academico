import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Pensum } from './entities/pensum.entity';
import { CreatePensumDto } from './dto/create-pensum.dto';
import { UpdatePensumDto } from './dto/update-pensum.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PensumDivisionAcademicaDetalle } from './entities/pensumdivisionacademicadetalle.entity';
import { PensumDivisionAcademicaMateriaDetalle } from './entities/pensumdivisionacademicamateriadetalle.entity';

@Injectable()
export class PensumService {
  private readonly logger = new Logger('PensumService');

  constructor(

    @InjectRepository(Pensum)
    private readonly pensumRepository: Repository<Pensum>,

    @InjectRepository(PensumDivisionAcademicaDetalle)
    private readonly pensumDivisionAcademicaDetalleRepository: Repository<PensumDivisionAcademicaDetalle>,

    @InjectRepository(PensumDivisionAcademicaMateriaDetalle)
    private readonly pensumDivisionAcademicaMateriaDetalleRepository: Repository<PensumDivisionAcademicaMateriaDetalle>,

    private readonly dataSource: DataSource,

  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listPensum = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listPensum, totalPagination] = await this.pensumRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listPensum, totalPagination] = await this.pensumRepository.findAndCount( {
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayPensum: listPensum,
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

  async store( createPensumDto: CreatePensumDto ) {
    try {
      const { arraydivisionacademica, ...toCreate } = createPensumDto;
      const pensum = this.pensumRepository.create( {
        ...toCreate,
        arraydivisionacademica: arraydivisionacademica?.filter( 
          ( item ) => ( item.divisionacademica !== null ) 
        ).map( ( divisionAcademica ) => {
          return this.pensumDivisionAcademicaDetalleRepository.create( {
            ...divisionAcademica,
            arraymateria: divisionAcademica.arraymateria?.filter( 
              ( item ) => ( item.materia !== null ) 
            ).map( ( details ) => {
              return this.pensumDivisionAcademicaMateriaDetalleRepository.create( {
                ...details,
                created_at: this.getDateTime(),
              } );
            } ),
            created_at: this.getDateTime(),
          } );
        } ),

        created_at: this.getDateTime(),
      } );
      await this.pensumRepository.save( pensum );
      return {
        resp: 1, error: false,
        message: 'Pensum registrado éxitosamente.',
        pensum: pensum,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne( idpensum: string ) {
    const pensum = await this.pensumRepository.findOneBy( {
      idpensum: idpensum,
    } );
    return pensum;
  }

  async edit( idpensum: string ) {
    try {
      const pensum = await this.findOne(idpensum);
      if ( pensum ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          pensum: pensum,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Pensum no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idpensum: string ) {
    try {
      const pensum = await this.findOne(idpensum);
      if ( pensum ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          pensum: pensum,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Pensum no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idpensum: string, updatePensumDto: UpdatePensumDto ) {
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const pensum = await this.findOne(idpensum);
      if ( pensum === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Pensum no existe.',
        };
      }
      const { arraydivisionacademica, ...toUpdate } = updatePensumDto;
      const pensumPreLoad = await this.pensumRepository.preload( {
        idpensum: idpensum,
        ...toUpdate,
        concurrencia: pensum.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( pensumPreLoad === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        return {
          resp: 0, error: false,
          message: 'Pensum no existe.',
        };
      }
      if ( arraydivisionacademica ) {
        pensum.arraydivisionacademica.map( async (divisionAcademica) => {
          await queryRunner.manager.delete( PensumDivisionAcademicaMateriaDetalle, { 
            fkidpensumdivisionacademicadetalle: { idpensumdivisionacademicadetalle: divisionAcademica.idpensumdivisionacademicadetalle } 
          } );
        } );
        await queryRunner.manager.delete( PensumDivisionAcademicaDetalle, { fkidpensum: { idpensum } } );
        pensumPreLoad.arraydivisionacademica = arraydivisionacademica.map( ( item ) => {
          return this.pensumDivisionAcademicaDetalleRepository.create( {
            ...item,
            arraymateria: item.arraymateria?.map( ( materia ) => {
              return this.pensumDivisionAcademicaMateriaDetalleRepository.create( {
                ...materia,
                created_at: this.getDateTime(),
              } );
            } ),
            created_at: this.getDateTime(),
          } );
        } );
      }
      const pensumUpdate = await queryRunner.manager.save( pensumPreLoad );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        resp: 1, error: false,
        message: 'Pensum actualizado éxitosamente.',
        pensum: pensum, pensumUpdate: pensumUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete( idpensum: string ) {
    try {
      let pensum = await this.findOne(idpensum);
      if ( pensum === null ) {
        return {
          resp: 0, error: true,
          message: 'Pensum no existe.',
        };
      }
      await this.pensumRepository.remove( pensum );
      return {
        resp: 1, error: false,
        message: 'Pensum eliminado éxitosamente.',
        pensum: pensum,
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
