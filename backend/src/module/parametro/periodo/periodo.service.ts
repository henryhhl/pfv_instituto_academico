import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { Periodo } from './entities/periodo.entity';

@Injectable()
export class PeriodoService {
  private readonly logger = new Logger('PeriodoService');

  constructor(
    @InjectRepository(Periodo)
    private readonly periodoRepository: Repository<Periodo>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listPeriodo = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listPeriodo, totalPagination] = await this.periodoRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listPeriodo, totalPagination] = await this.periodoRepository.findAndCount( {
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
        arrayPeriodo: listPeriodo,
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

  async store(createPeriodoDto: CreatePeriodoDto) {
    try {
      const periodo = this.periodoRepository.create( {
        sigla: createPeriodoDto.sigla,
        descripcion: createPeriodoDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.periodoRepository.save( periodo );
      return {
        resp: 1, error: false,
        message: 'Periodo registrado éxitosamente.',
        periodo: periodo,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idperiodo: string) {
    const periodo = await this.periodoRepository.findOneBy( {
      idperiodo: idperiodo,
    } );
    return periodo;
  }

  async edit( idperiodo: string ) {
    try {
      const periodo = await this.findOne(idperiodo);
      if ( periodo ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            periodo: periodo,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Periodo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idperiodo: string ) {
    try {
      const periodo = await this.findOne(idperiodo);
      if ( periodo ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            periodo: periodo,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Periodo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idperiodo: string, updatePeriodoDto: UpdatePeriodoDto ) {
    const periodo = await this.findOne(idperiodo);
    if ( periodo === null ) {
      return {
        resp: 0, error: false,
        message: 'Periodo no existe.',
      };
    }
    const periodoPreLoad = await this.periodoRepository.preload( {
      idperiodo: idperiodo,
      ...updatePeriodoDto,
      concurrencia: periodo.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( periodoPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Periodo no existe.',
      };
    }
    const periodoUpdate = await this.periodoRepository.save( periodoPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Periodo actualizado éxitosamente.',
      periodo: periodo,
      periodoUpdate: periodoUpdate,
    };
  }

  async delete(idperiodo: string) {
    try {
      let periodo = await this.findOne(idperiodo);
      if ( periodo === null ) {
        return {
          resp: 0, error: true,
          message: 'Periodo no existe.',
        };
      }
      await this.periodoRepository.remove( periodo );
      return {
        resp: 1, error: false,
        message: 'Periodo eliminado éxitosamente.',
        periodo: periodo,
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
