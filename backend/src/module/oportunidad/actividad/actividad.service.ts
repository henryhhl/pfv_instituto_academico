import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Actividad } from './entities/actividad.entity';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class ActividadService {
  private readonly logger = new Logger('ActividadService');

  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listActividad = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listActividad, totalPagination] = await this.actividadRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { negocio: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listActividad, totalPagination] = await this.actividadRepository.findAndCount( {
          where: [
            { negocio: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayActividad: listActividad,
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

  async store(createActividadDto: CreateActividadDto) {
    try {
      const actividad = this.actividadRepository.create( {
        ...createActividadDto,
        created_at: this.getDateTime(),
      } );
      await this.actividadRepository.save( actividad );
      return {
        resp: 1, error: false,
        message: 'Actividad registrado éxitosamente.',
        actividad: actividad,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idactividad: string) {
    const actividad = await this.actividadRepository.findOneBy( {
      idactividad,
    } );
    return actividad;
  }

  async edit(idactividad: string) {
    try {
      const actividad = await this.findOne(idactividad);
      if ( actividad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          actividad: actividad,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Actividad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idactividad: string) {
    try {
      const actividad = await this.findOne(idactividad);
      if ( actividad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          actividad: actividad,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Actividad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idactividad: string, updateActividadDto: UpdateActividadDto) {
    try {
      const actividad = await this.findOne(idactividad);
      if ( actividad === null ) {
        return {
          resp: 0, error: false,
          message: 'Actividad no existe.',
        };
      }
      const actividadPreLoad = await this.actividadRepository.preload( {
        idactividad: idactividad,
        ...updateActividadDto,
        concurrencia: actividad.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( actividadPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Actividad no existe.',
        };
      }
      const actividadUpdate = await this.actividadRepository.save( actividadPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Actividad actualizado éxitosamente.',
        actividad: actividadUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idactividad: string) {
    try {
      let actividad = await this.findOne(idactividad);
      if ( actividad === null ) {
        return {
          resp: 0, error: true,
          message: 'Actividad no existe.',
        };
      }
      await this.actividadRepository.remove( actividad );
      return {
        resp: 1, error: false,
        message: 'Actividad eliminado éxitosamente.',
        actividad: actividad,
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
