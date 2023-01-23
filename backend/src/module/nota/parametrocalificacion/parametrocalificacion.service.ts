import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ParametroCalificacion } from './entities/parametrocalificacion.entity';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateParametrocalificacionDto } from './dto/create-parametrocalificacion.dto';
import { UpdateParametrocalificacionDto } from './dto/update-parametrocalificacion.dto';

@Injectable()
export class ParametroCalificacionService {
  private readonly logger = new Logger('ParametroCalificacionService');

  constructor(
    @InjectRepository(ParametroCalificacion)
    private readonly parametroCalificacionRepository: Repository<ParametroCalificacion>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listParametroCalificacion = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listParametroCalificacion, totalPagination] = await this.parametroCalificacionRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listParametroCalificacion, totalPagination] = await this.parametroCalificacionRepository.findAndCount( {
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
        arrayParametroCalificacion: listParametroCalificacion,
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

  async store(createParametrocalificacionDto: CreateParametrocalificacionDto) {
    try {
      const parametroCalificacionCreate = this.parametroCalificacionRepository.create( {
        ...createParametrocalificacionDto,
        created_at: this.getDateTime(),
      } );
      const parametroCalificacionSave = await this.parametroCalificacionRepository.save( parametroCalificacionCreate );
      return {
        resp: 1, error: false,
        message: 'Parametro Calificación registrado éxitosamente.',
        parametroCalificacion: parametroCalificacionSave,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idparametrocalificacion: string) {
    try {
      const parametroCalificacionFirst = await this.parametroCalificacionRepository.findOneBy( {
        idparametrocalificacion,
      } );
      return parametroCalificacionFirst;
    } catch (error) {
      return null;
    }
  }

  async edit(idparametrocalificacion: string) {
    try {
      const parametroCalificacionFirst = await this.findOne(idparametrocalificacion);
      if ( parametroCalificacionFirst ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          parametroCalificacion: parametroCalificacionFirst,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Parametro Calificación no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idparametrocalificacion: string) {
    try {
      const parametroCalificacionFirst = await this.findOne(idparametrocalificacion);
      if ( parametroCalificacionFirst ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          parametroCalificacion: parametroCalificacionFirst,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Parametro Calificación no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idparametrocalificacion: string, updateParametrocalificacionDto: UpdateParametrocalificacionDto) {
    try {
      const parametroCalificacionFirst = await this.findOne(idparametrocalificacion);
      if ( parametroCalificacionFirst === null ) {
        return {
          resp: 0, error: false,
          message: 'Parametro Calificación no existe.',
        };
      }
      const parametroCalificacionPreLoad = await this.parametroCalificacionRepository.preload( {
        idparametrocalificacion: idparametrocalificacion,
        ...updateParametrocalificacionDto,
        concurrencia: parametroCalificacionFirst.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( parametroCalificacionPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Parametro Calificación no existe.',
        };
      }
      const parametroCalificacionUpdate = await this.parametroCalificacionRepository.save( parametroCalificacionPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Parametro Calificación actualizado éxitosamente.',
        parametroCalificacion: parametroCalificacionUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idparametrocalificacion: string) {
    try {
      let parametroCalificacion = await this.findOne(idparametrocalificacion);
      if ( parametroCalificacion === null ) {
        return {
          resp: 0, error: true,
          message: 'Parametro Calificación no existe.',
        };
      }
      await this.parametroCalificacionRepository.remove( parametroCalificacion );
      return {
        resp: 1, error: false,
        message: 'Parametro Calificación eliminado éxitosamente.',
        parametroCalificacion: parametroCalificacion,
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
