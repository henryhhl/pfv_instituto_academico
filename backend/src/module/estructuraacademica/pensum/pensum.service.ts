import { Injectable, Logger } from '@nestjs/common';
import { CreatePensumDto } from './dto/create-pensum.dto';
import { UpdatePensumDto } from './dto/update-pensum.dto';
import { Pensum } from './entities/pensum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class PensumService {
  private readonly logger = new Logger('PensumService');

  constructor(
    @InjectRepository(Pensum)
    private readonly pensumRepository: Repository<Pensum>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listPensum = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listPensum, totalPagination] = await this.pensumRepository.findAndCount( {
          take: limit,
          skip: offset,
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: {
            created_at: "DESC",
          },
        } );
      } else {
        [listPensum, totalPagination] = await this.pensumRepository.findAndCount( {
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: {
            created_at: "DESC",
          },
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
      const pensum = this.pensumRepository.create( {
        fkidunidadnegocio: createPensumDto.fkidunidadnegocio,
        unidadnegocio: createPensumDto.unidadnegocio,

        fkidunidadadministrativa: createPensumDto.fkidunidadadministrativa,
        unidadadministrativa: createPensumDto.unidadadministrativa,

        fkidunidadacademica: createPensumDto.fkidunidadacademica,
        unidadacademica: createPensumDto.unidadacademica,

        fkidprograma: createPensumDto.fkidprograma,
        programa: createPensumDto.programa,
        
        descripcion: createPensumDto.descripcion,
        fechaaprobacion: createPensumDto.fechaaprobacion,
        estadoproceso: createPensumDto.estadoproceso,
        nota: createPensumDto.nota ? createPensumDto.nota : '',
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
    const pensum = await this.findOne(idpensum);
    if ( pensum === null ) {
      return {
        resp: 0, error: false,
        message: 'Pensum no existe.',
      };
    }
    const pensumPreLoad = await this.pensumRepository.preload( {
      idpensum: idpensum,
      ...updatePensumDto,
      concurrencia: pensum.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( pensumPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Pensum no existe.',
      };
    }
    const pensumUpdate = await this.pensumRepository.save( pensumPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Pensum actualizado éxitosamente.',
      pensum: pensum,
      pensumUpdate: pensumUpdate,
    };
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
