import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { TipoResultado } from './entities/tiporesultado.entity';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateTipoResultadoDto } from './dto/create-tiporesultado.dto';
import { UpdateTipoResultadoDto } from './dto/update-tiporesultado.dto';

@Injectable()
export class TipoResultadoService {
  private readonly logger = new Logger('TipoResultadoService');

  constructor(
    @InjectRepository(TipoResultado)
    private readonly tipoResultadoRepository: Repository<TipoResultado>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listTipoResultado = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listTipoResultado, totalPagination] = await this.tipoResultadoRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listTipoResultado, totalPagination] = await this.tipoResultadoRepository.findAndCount( {
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
        arrayTipoResultado: listTipoResultado,
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

  private async existsDescripcion(descrpcion: string) {
    const tipoResultado = await this.tipoResultadoRepository.findOne( {
      where: { descripcion: descrpcion, },
      order: { created_at: 'DESC', },
    } );
    return tipoResultado ? true : false;
  }

  async store(createTiporesultadoDto: CreateTipoResultadoDto) {
    try {
      const existsDescripcion = await this.existsDescripcion( createTiporesultadoDto.descripcion );
      if ( existsDescripcion === true ) {
        return {
          resp: 0, error: false,
          message: 'Tipo ya existente, favor ingresar uno nuevo.',
        };
      } 
      const tipoResultado = this.tipoResultadoRepository.create( {
        ...createTiporesultadoDto,
        created_at: this.getDateTime(),
      } );
      await this.tipoResultadoRepository.save( tipoResultado );
      return {
        resp: 1, error: false,
        message: 'Tipo Resultado registrado éxitosamente.',
        tipoResultado: tipoResultado,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idtiporesultado: string) {
    const tipoResultado = await this.tipoResultadoRepository.findOneBy( {
      idtiporesultado,
    } );
    return tipoResultado;
  }

  async edit(idtiporesultado: string) {
    try {
      const tipoResultado = await this.findOne(idtiporesultado);
      if ( tipoResultado ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoResultado: tipoResultado,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Resultado no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idtiporesultado: string) {
    try {
      const tipoResultado = await this.findOne(idtiporesultado);
      if ( tipoResultado ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoResultado: tipoResultado,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Resultado no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idtiporesultado: string, updateTiporesultadoDto: UpdateTipoResultadoDto) {
    try {
      const tipoResultado = await this.findOne(idtiporesultado);
      if ( tipoResultado === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Resultado no existe.',
        };
      }
      if ( tipoResultado.descripcion !== updateTiporesultadoDto.descripcion ) {
        const existsDescripcion = await this.existsDescripcion( updateTiporesultadoDto.descripcion );
        if ( existsDescripcion === true ) {
          return {
            resp: 0, error: false,
            message: 'Tipo ya existente, favor ingresar uno nuevo.',
          };
        } 
      }
      const tipoResultadoPreLoad = await this.tipoResultadoRepository.preload( {
        idtiporesultado: idtiporesultado,
        ...updateTiporesultadoDto,
        concurrencia: tipoResultado.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( tipoResultadoPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Resultado no existe.',
        };
      }
      const tipoResultadoUpdate = await this.tipoResultadoRepository.save( tipoResultadoPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Tipo Resultado actualizado éxitosamente.',
        tipoResultado: tipoResultadoUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idtiporesultado: string) {
    try {
      let tipoResultado = await this.findOne(idtiporesultado);
      if ( tipoResultado === null ) {
        return {
          resp: 0, error: true,
          message: 'Tipo Resultado no existe.',
        };
      }
      await this.tipoResultadoRepository.remove( tipoResultado );
      return {
        resp: 1, error: false,
        message: 'Tipo Resultado eliminado éxitosamente.',
        tipoResultado: tipoResultado,
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
