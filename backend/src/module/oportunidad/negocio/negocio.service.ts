import { Injectable, Logger } from '@nestjs/common';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateNegocioDto } from './dto/update-negocio.dto';
import { Negocio } from './entities/negocio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class NegocioService {
  private readonly logger = new Logger('NegocioService');

  constructor(
    @InjectRepository(Negocio)
    private readonly negocioRepository: Repository<Negocio>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listNegocio = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listNegocio, totalPagination] = await this.negocioRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { oportunidad: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listNegocio, totalPagination] = await this.negocioRepository.findAndCount( {
          where: [
            { oportunidad: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayNegocio: listNegocio,
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

  async store(createNegocioDto: CreateNegocioDto) {
    try {
      const negocio = this.negocioRepository.create( {
        ...createNegocioDto,
        created_at: this.getDateTime(),
      } );
      await this.negocioRepository.save( negocio );
      return {
        resp: 1, error: false,
        message: 'Negocio registrado éxitosamente.',
        negocio: negocio,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idnegocio: string) {
    const negocio = await this.negocioRepository.findOneBy( {
      idnegocio,
    } );
    return negocio;
  }

  async edit(idnegocio: string) {
    try {
      const negocio = await this.findOne(idnegocio);
      if ( negocio ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          negocio: negocio,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Negocio no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idnegocio: string) {
    try {
      const negocio = await this.findOne(idnegocio);
      if ( negocio ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          negocio: negocio,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Negocio no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idnegocio: string, updateNegocioDto: UpdateNegocioDto) {
    try {
      const negocio = await this.findOne(idnegocio);
      if ( negocio === null ) {
        return {
          resp: 0, error: false,
          message: 'Negocio no existe.',
        };
      }
      const negocioPreLoad = await this.negocioRepository.preload( {
        idnegocio: idnegocio,
        ...updateNegocioDto,
        concurrencia: negocio.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( negocioPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Negocio no existe.',
        };
      }
      const negocioUpdate = await this.negocioRepository.save( negocioPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Negocio actualizado éxitosamente.',
        negocio: negocioUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idnegocio: string) {
    try {
      let negocio = await this.findOne(idnegocio);
      if ( negocio === null ) {
        return {
          resp: 0, error: true,
          message: 'Negocio no existe.',
        };
      }
      await this.negocioRepository.remove( negocio );
      return {
        resp: 1, error: false,
        message: 'Negocio eliminado éxitosamente.',
        negocio: negocio,
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
