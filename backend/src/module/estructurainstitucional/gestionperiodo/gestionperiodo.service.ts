import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { GestionPeriodo } from './entities/gestionperiodo.entity';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateGestionPeriodoDto } from './dto/create-gestionperiodo.dto';
import { UpdateGestionPeriodoDto } from './dto/update-gestionperiodo.dto';

@Injectable()
export class GestionPeriodoService {
  private readonly logger = new Logger('GestionPeriodoService');

  constructor(
    @InjectRepository(GestionPeriodo)
    private readonly gestionPeriodoRepository: Repository<GestionPeriodo>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listGestionPeriodo = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listGestionPeriodo, totalPagination] = await this.gestionPeriodoRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
            { fechainicio: ILike( '%' + search + '%', ), },
            { fechafinal: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listGestionPeriodo, totalPagination] = await this.gestionPeriodoRepository.findAndCount( {
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
            { fechainicio: ILike( '%' + search + '%', ), },
            { fechafinal: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayGestionPeriodo: listGestionPeriodo,
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

  async store(createGestionperiodoDto: CreateGestionPeriodoDto) {
    try {
      const gestionPeriodo = this.gestionPeriodoRepository.create( {
        descripcion: createGestionperiodoDto.descripcion,
        orden: createGestionperiodoDto.orden,
        fechainicio: createGestionperiodoDto.fechainicio,
        fechafinal: createGestionperiodoDto.fechafinal,
        created_at: this.getDateTime(),
      } );
      await this.gestionPeriodoRepository.save( gestionPeriodo );
      return {
        resp: 1, error: false,
        message: 'Gestión Periodo registrado éxitosamente.',
        gestionPeriodo: gestionPeriodo,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idgestionperiodo: string) {
    try {
      const gestionPeriodo = await this.gestionPeriodoRepository.findOneBy( {
        idgestionperiodo: idgestionperiodo,
      } );
      return gestionPeriodo;
    } catch (error) {
      return null;
    }
  }

  async edit(idgestionperiodo: string) {
    try {
      const gestionPeriodo = await this.findOne(idgestionperiodo);
      if ( gestionPeriodo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          gestionPeriodo: gestionPeriodo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Gestion Periodo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idgestionperiodo: string) {
    try {
      const gestionPeriodo = await this.findOne(idgestionperiodo);
      if ( gestionPeriodo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          gestionPeriodo: gestionPeriodo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Gestion Periodo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idgestionperiodo: string, updateGestionperiodoDto: UpdateGestionPeriodoDto) {
    const gestionPeriodo = await this.findOne(idgestionperiodo);
    if ( gestionPeriodo === null ) {
      return {
        resp: 0, error: false,
        message: 'Gestion Periodo no existe.',
      };
    }
    const gestionPeriodoPreLoad = await this.gestionPeriodoRepository.preload( {
      idgestionperiodo: idgestionperiodo,
      ...updateGestionperiodoDto,
      concurrencia: gestionPeriodo.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( gestionPeriodoPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Gestion Periodo no existe.',
      };
    }
    const gestionPeriodoUpdate = await this.gestionPeriodoRepository.save( gestionPeriodoPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Gestion Periodo actualizado éxitosamente.',
      gestionPeriodo: gestionPeriodo,
      gestionPeriodoUpdate: gestionPeriodoUpdate,
    };
  }

  async delete(idgestionperiodo: string) {
    try {
      let gestionPeriodo = await this.findOne(idgestionperiodo);
      if ( gestionPeriodo === null ) {
        return {
          resp: 0, error: true,
          message: 'Gestion Periodo no existe.',
        };
      }
      await this.gestionPeriodoRepository.remove( gestionPeriodo );
      return {
        resp: 1, error: false,
        message: 'Gestion Periodo eliminado éxitosamente.',
        gestionPeriodo: gestionPeriodo,
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
