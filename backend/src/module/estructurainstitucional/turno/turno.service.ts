import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Turno } from './entities/turno.entity';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class TurnoService {
  private readonly logger = new Logger('TurnoService');

  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listTurno = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listTurno, totalPagination] = await this.turnoRepository.findAndCount( {
          // select: [
          //   'idturno', 'fkidunidadadministrativa', 'unidadadministrativa', 
          //   'sigla', 'descripcion', 'estado',
          // ],
          take: limit, skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );

        // const queryBuilder = this.turnoRepository.createQueryBuilder(); 
        // const query = await queryBuilder
        //   .where('UPPER(title) =:title or slug =:slug', {
        //     title: search.toUpperCase(),
        //     slug: search.toLowerCase(),
        //   }).getOne();
      } else {
        [listTurno, totalPagination] = await this.turnoRepository.findAndCount( {
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
        arrayTurno: listTurno,
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

  async store( createTurnoDto: CreateTurnoDto ) {
    try {
      const turno = this.turnoRepository.create( {
        sigla: createTurnoDto.sigla,
        descripcion: createTurnoDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.turnoRepository.save( turno );
      return {
        resp: 1, error: false,
        message: 'Turno registrado éxitosamente.',
        turno: turno,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne( idturno: string ) {
    try {
      const turno = await this.turnoRepository.findOneBy( {
        idturno: idturno,
      } );
      return turno;
    } catch (error) {
      return null;
    }
  }

  async edit(idturno: string) {
    try {
      const turno = await this.findOne(idturno);
      if ( turno ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          turno: turno,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Turno no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idturno: string) {
    try {
      const turno = await this.findOne(idturno);
      if ( turno ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          turno: turno,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Turno no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idturno: string, updateTurnoDto: UpdateTurnoDto ) {
    const turno = await this.findOne(idturno);
    if ( turno === null ) {
      return {
        resp: 0, error: false,
        message: 'Turno no existe.',
      };
    }
    const turnoPreLoad = await this.turnoRepository.preload( {
      idturno: idturno,
      ...updateTurnoDto,
      concurrencia: turno.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( turnoPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Turno no existe.',
      };
    }
    const turnoUpdate = await this.turnoRepository.save( turnoPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Turno actualizado éxitosamente.',
      turno: turno,
      turnoUpdate: turnoUpdate,
    };
  }

  async delete(idturno: string) {
    try {
      let turno = await this.findOne(idturno);
      if ( turno === null ) {
        return {
          resp: 0, error: true,
          message: 'Turno no existe.',
        };
      }
      await this.turnoRepository.remove( turno );
      return {
        resp: 1, error: false,
        message: 'Turno eliminado éxitosamente.',
        turno: turno,
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
