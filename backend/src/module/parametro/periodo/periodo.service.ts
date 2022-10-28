import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { v4 as uuid } from 'uuid';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { Periodo } from './entities/periodo.entity';

@Injectable()
export class PeriodoService {

  private listPeriodo: Periodo[] = [];
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
          take: limit,
          skip: offset,
          where: {
            descripcion: Like( '%' + search + '%', ),
          },
          order: {
            created_at: "DESC",
          },
        } );
      } else {
        [listPeriodo, totalPagination] = await this.periodoRepository.findAndCount( {
          where: {
            descripcion: Like( '%' + search + '%', ),
          },
          order: {
            created_at: "DESC",
          },
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

  update(id: string, updatePeriodoDto: UpdatePeriodoDto) {
    let periodoDB = this.findOne(id);
    if ( periodoDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Periodo no existe.',
      };
    }

    // this.listPeriodo = this.listPeriodo.map( (periodo) => {
    //   if ( periodo.idperiodo === id ) {
    //     periodoDB.updated_at = '';
    //     periodoDB = {
    //       ...periodoDB,
    //       ...updatePeriodoDto,
    //       idperiodo: id,
    //       concurrencia: periodo.concurrencia + 1,
    //     };
    //     return periodoDB;
    //   }
    //   return periodo;
    // } );
    return {
      resp: 1,
      error: false,
      message: 'Periodo actualizado éxitosamente.',
      periodo: periodoDB,
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
