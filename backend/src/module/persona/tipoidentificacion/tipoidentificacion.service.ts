import { Injectable, Logger } from '@nestjs/common';
import { CreateTipoIdentificacionDto } from './dto/create-tipoidentificacion.dto';
import { UpdateTipoIdentificacionDto } from './dto/update-tipoidentificacion.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoIdentificacion } from './entities/tipoidentificacion.entity';

@Injectable()
export class TipoIdentificacionService {
  private readonly logger = new Logger('TipoIdentificacionService');

  constructor(
    @InjectRepository(TipoIdentificacion)
    private readonly tipoIdentificacionRepository: Repository<TipoIdentificacion>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listTipoIdentificacion = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listTipoIdentificacion, totalPagination] = await this.tipoIdentificacionRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listTipoIdentificacion, totalPagination] = await this.tipoIdentificacionRepository.findAndCount( {
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayTipoIdentificacion: listTipoIdentificacion,
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

  async store(createTipoidentificacionDto: CreateTipoIdentificacionDto) {
    try {
      const tipoIdentificacion = this.tipoIdentificacionRepository.create( {
        sigla: createTipoidentificacionDto.sigla,
        descripcion: createTipoidentificacionDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.tipoIdentificacionRepository.save( tipoIdentificacion );
      return {
        resp: 1, error: false,
        message: 'Tipo Identificación registrado éxitosamente.',
        tipoIdentificacion: tipoIdentificacion,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idtipoidentificacion: string) {
    const tipoIdentificacion = await this.tipoIdentificacionRepository.findOneBy( {
      idtipoidentificacion: idtipoidentificacion,
    } );
    return tipoIdentificacion;
  }

  async edit(idtipoidentificacion: string) {
    try {
      const tipoIdentificacion = await this.findOne(idtipoidentificacion);
      if ( tipoIdentificacion ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoIdentificacion: tipoIdentificacion,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Identificacion no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idtipoidentificacion: string) {
    try {
      const tipoIdentificacion = await this.findOne(idtipoidentificacion);
      if ( tipoIdentificacion ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoIdentificacion: tipoIdentificacion,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Identificacion no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idtipoidentificacion: string, updateTipoidentificacionDto: UpdateTipoIdentificacionDto) {
    try {
      const tipoIdentificacion = await this.findOne(idtipoidentificacion);
      if ( tipoIdentificacion === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Identificacion no existe.',
        };
      }
      const tipoIdentificacionPreLoad = await this.tipoIdentificacionRepository.preload( {
        idtipoidentificacion: idtipoidentificacion,
        ...updateTipoidentificacionDto,
        concurrencia: tipoIdentificacion.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( tipoIdentificacionPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Identificacion no existe.',
        };
      }
      const tipoIdentificacionUpdate = await this.tipoIdentificacionRepository.save( tipoIdentificacionPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Tipo Identificacion actualizado éxitosamente.',
        tipoIdentificacion: tipoIdentificacion,
        tipoIdentificacionUpdate: tipoIdentificacionUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idtipoidentificacion: string) {
    try {
      let tipoIdentificacion = await this.findOne(idtipoidentificacion);
      if ( tipoIdentificacion === null ) {
        return {
          resp: 0, error: true,
          message: 'Tipo Identificacion no existe.',
        };
      }
      await this.tipoIdentificacionRepository.remove( tipoIdentificacion );
      return {
        resp: 1, error: false,
        message: 'Tipo Identificacion eliminado éxitosamente.',
        tipoIdentificacion: tipoIdentificacion,
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
