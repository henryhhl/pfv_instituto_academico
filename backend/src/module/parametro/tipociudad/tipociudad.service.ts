import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateTipoCiudadDto } from './dto/create-tipociudad.dto';
import { UpdateTipoCiudadDto } from './dto/update-tipociudad.dto';
import { TipoCiudad } from './entities/tipociudad.entity';

@Injectable()
export class TipoCiudadService {
  private readonly logger = new Logger('TipoCiudadService');

  constructor(
    @InjectRepository(TipoCiudad)
    private readonly tipoCiudadRepository: Repository<TipoCiudad>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listTipoCiudad = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listTipoCiudad, totalPagination] = await this.tipoCiudadRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listTipoCiudad, totalPagination] = await this.tipoCiudadRepository.findAndCount( {
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayTipoCiudad: listTipoCiudad,
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

  async store(createTipociudadDto: CreateTipoCiudadDto) {
    try {
      const tipoCiudad = this.tipoCiudadRepository.create( {
        descripcion: createTipociudadDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.tipoCiudadRepository.save( tipoCiudad );
      return {
        resp: 1, error: false,
        message: 'Tipo Ciudad registrado éxitosamente.',
        tipoCiudad: tipoCiudad,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idtipociudad: string) {
    const tipoCiudad = await this.tipoCiudadRepository.findOneBy( {
      idtipociudad: idtipociudad,
    } );
    return tipoCiudad;
  }

  async edit(idtipociudad: string) {
    try {
      const tipoCiudad = await this.findOne(idtipociudad);
      if ( tipoCiudad ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            tipoCiudad: tipoCiudad,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Ciudad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idtipociudad: string) {
    try {
      const tipoCiudad = await this.findOne(idtipociudad);
      if ( tipoCiudad ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            tipoCiudad: tipoCiudad,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Ciudad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idtipociudad: string, updateTipociudadDto: UpdateTipoCiudadDto ) {
    const tipoCiudad = await this.findOne(idtipociudad);
    if ( tipoCiudad === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo ciudad no existe.',
      };
    }
    const tipoCiudadPreLoad = await this.tipoCiudadRepository.preload( {
      idtipociudad: idtipociudad,
      ...updateTipociudadDto,
      concurrencia: tipoCiudad.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( tipoCiudadPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo ciudad no existe.',
      };
    }
    const tipoCiudadUpdate = await this.tipoCiudadRepository.save( tipoCiudadPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Tipo ciudad actualizado éxitosamente.',
      tipoCiudad: tipoCiudad,
      tipoCiudadUpdate: tipoCiudadUpdate,
    };
  }

  async delete(idtipociudad: string) {
    try {
      let tipoCiudad = await this.findOne(idtipociudad);
      if ( tipoCiudad === null ) {
        return {
          resp: 0, error: true,
          message: 'Tipo Ciudad no existe.',
        };
      }
      await this.tipoCiudadRepository.remove( tipoCiudad );
      return {
        resp: 1, error: false,
        message: 'Tipo Ciudad eliminado éxitosamente.',
        tipoCiudad: tipoCiudad,
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
