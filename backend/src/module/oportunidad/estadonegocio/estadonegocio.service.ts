import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { EstadoNegocio } from './entities/estadonegocio.entity';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateEstadoNegocioDto } from './dto/create-estadonegocio.dto';
import { UpdateEstadoNegocioDto } from './dto/update-estadonegocio.dto';

@Injectable()
export class EstadoNegocioService {
  private readonly logger = new Logger('EstadoNegocioService');

  constructor(
    @InjectRepository(EstadoNegocio)
    private readonly estadoNegocioRepository: Repository<EstadoNegocio>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listEstadoNegocio = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listEstadoNegocio, totalPagination] = await this.estadoNegocioRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listEstadoNegocio, totalPagination] = await this.estadoNegocioRepository.findAndCount( {
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayEstadoNegocio: listEstadoNegocio,
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

  private async existsDescripcion(descripcion: string) {
    const estadoNegocio = await this.estadoNegocioRepository.findOne( {
      where: { descripcion: descripcion, },
      order: { created_at: 'DESC', },
    } );
    return estadoNegocio ? true : false;
  }

  async store(createEstadonegocioDto: CreateEstadoNegocioDto) {
    try {
      const existsDescripcion = await this.existsDescripcion( createEstadonegocioDto.descripcion );
      if ( existsDescripcion === true ) {
        return {
          resp: 0, error: false,
          message: 'Nombre Estado ya existente, favor ingresar uno nuevo.',
        };
      } 
      const estadoNegocio = this.estadoNegocioRepository.create( {
        ...createEstadonegocioDto,
        created_at: this.getDateTime(),
      } );
      await this.estadoNegocioRepository.save( estadoNegocio );
      return {
        resp: 1, error: false,
        message: 'Estado Negocio registrado éxitosamente.',
        estadoNegocio: estadoNegocio,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idestadonegocio: string) {
    const estadoNegocio = await this.estadoNegocioRepository.findOneBy( {
      idestadonegocio,
    } );
    return estadoNegocio;
  }

  async edit(idestadonegocio: string) {
    try {
      const estadoNegocio = await this.findOne(idestadonegocio);
      if ( estadoNegocio ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          estadoNegocio: estadoNegocio,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Estado Negocio no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idestadonegocio: string) {
    try {
      const estadoNegocio = await this.findOne(idestadonegocio);
      if ( estadoNegocio ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          estadoNegocio: estadoNegocio,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Estado Negocio no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }



  async update(idestadonegocio: string, updateEstadonegocioDto: UpdateEstadoNegocioDto) {
    try {
      const estadoNegocio = await this.findOne(idestadonegocio);
      if ( estadoNegocio === null ) {
        return {
          resp: 0, error: false,
          message: 'Estado Negocio no existe.',
        };
      }
      if ( estadoNegocio.descripcion !== updateEstadonegocioDto.descripcion ) {
        const existsDescripcion = await this.existsDescripcion( updateEstadonegocioDto.descripcion );
        if ( existsDescripcion === true ) {
          return {
            resp: 0, error: false,
            message: 'Nombre de Estado ya existente, favor ingresar uno nuevo.',
          };
        } 
      }
      const estadoNegocioPreLoad = await this.estadoNegocioRepository.preload( {
        idestadonegocio: idestadonegocio,
        ...updateEstadonegocioDto,
        concurrencia: estadoNegocio.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( estadoNegocioPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Estado Negocio no existe.',
        };
      }
      const estadoNegocioUpdate = await this.estadoNegocioRepository.save( estadoNegocioPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Estado Negocio actualizado éxitosamente.',
        estadoNegocio: estadoNegocioUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idestadonegocio: string) {
    try {
      let estadoNegocio = await this.findOne(idestadonegocio);
      if ( estadoNegocio === null ) {
        return {
          resp: 0, error: true,
          message: 'Estado Negocio no existe.',
        };
      }
      await this.estadoNegocioRepository.remove( estadoNegocio );
      return {
        resp: 1, error: false,
        message: 'Estado Negocio eliminado éxitosamente.',
        estadoNegocio: estadoNegocio,
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
