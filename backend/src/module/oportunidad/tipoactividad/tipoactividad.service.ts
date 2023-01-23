import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { TipoActividad } from './entities/tipoactividad.entity';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateTipoActividadDto } from './dto/create-tipoactividad.dto';
import { UpdateTipoActividadDto } from './dto/update-tipoactividad.dto';

@Injectable()
export class TipoActividadService {
  private readonly logger = new Logger('TipoActividadService');

  constructor(
    @InjectRepository(TipoActividad)
    private readonly tipoActividadRepository: Repository<TipoActividad>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listTipoActividad = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listTipoActividad, totalPagination] = await this.tipoActividadRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listTipoActividad, totalPagination] = await this.tipoActividadRepository.findAndCount( {
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
        arrayTipoActividad: listTipoActividad,
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

  async store(createTipoactividadDto: CreateTipoActividadDto) {
    try {
      const existsDescripcion = await this.existsDescripcion( createTipoactividadDto.descripcion );
      if ( existsDescripcion === true ) {
        return {
          resp: 0, error: false,
          message: 'Tipo ya existente, favor ingresar uno nuevo.',
        };
      } 
      const tipoActividad = this.tipoActividadRepository.create( {
        ...createTipoactividadDto,
        created_at: this.getDateTime(),
      } );
      await this.tipoActividadRepository.save( tipoActividad );
      return {
        resp: 1, error: false,
        message: 'Tipo Actividad registrado éxitosamente.',
        tipoActividad: tipoActividad,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idtipoactividad: string) {
    const tipoActividad = await this.tipoActividadRepository.findOneBy( {
      idtipoactividad,
    } );
    return tipoActividad;
  }

  private async existsDescripcion(descrpcion: string) {
    const tipoActividad = await this.tipoActividadRepository.findOne( {
      where: { descripcion: descrpcion, },
      order: { created_at: 'DESC', },
    } );
    return tipoActividad ? true : false;
  }

  async edit(idtipoactividad: string) {
    try {
      const tipoActividad = await this.findOne(idtipoactividad);
      if ( tipoActividad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoActividad: tipoActividad,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Actividad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idtipoactividad: string) {
    try {
      const tipoActividad = await this.findOne(idtipoactividad);
      if ( tipoActividad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoActividad: tipoActividad,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Actividad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idtipoactividad: string, updateTipoactividadDto: UpdateTipoActividadDto) {
    try {
      const tipoActividad = await this.findOne(idtipoactividad);
      if ( tipoActividad === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Actividad no existe.',
        };
      }
      if ( tipoActividad.descripcion !== updateTipoactividadDto.descripcion ) {
        const existsDescripcion = await this.existsDescripcion( updateTipoactividadDto.descripcion );
        if ( existsDescripcion === true ) {
          return {
            resp: 0, error: false,
            message: 'Tipo ya existente, favor ingresar uno nuevo.',
          };
        } 
      }
      const tipoActividadPreLoad = await this.tipoActividadRepository.preload( {
        idtipoactividad: idtipoactividad,
        ...updateTipoactividadDto,
        concurrencia: tipoActividad.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( tipoActividadPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Actividad no existe.',
        };
      }
      const tipoActividadUpdate = await this.tipoActividadRepository.save( tipoActividadPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Tipo Actividad actualizado éxitosamente.',
        tipoActividad: tipoActividadUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idtipoactividad: string) {
    try {
      let tipoActividad = await this.findOne(idtipoactividad);
      if ( tipoActividad === null ) {
        return {
          resp: 0, error: true,
          message: 'Tipo Actividad no existe.',
        };
      }
      await this.tipoActividadRepository.remove( tipoActividad );
      return {
        resp: 1, error: false,
        message: 'Tipo Actividad eliminado éxitosamente.',
        tipoActividad: tipoActividad,
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
