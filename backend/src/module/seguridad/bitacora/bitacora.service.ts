import { Injectable, Logger } from '@nestjs/common';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';
import { UpdateBitacoraDto } from './dto/update-bitacora.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bitacora } from './entities/bitacora.entity';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class BitacoraService {
  private readonly logger = new Logger('BitacoraService');

  constructor(
    @InjectRepository(Bitacora)
    private readonly bitacoraRepository: Repository<Bitacora>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listBitacora = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listBitacora, totalPagination] = await this.bitacoraRepository.findAndCount( {
          select: {
            idbitacora: true, accion: true, descripcion: true,
            x_fecha: true, x_hora: true, uri: true, ip: true, created_at: true,
            usuario: { idusuario: true, nombreprincipal: true, email: true, },
          },
          relations: { usuario: true, },
          take: limit, skip: offset,
          where: [
            { accion: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listBitacora, totalPagination] = await this.bitacoraRepository.findAndCount( {
          select: {
            idbitacora: true, accion: true, descripcion: true,
            x_fecha: true, x_hora: true, uri: true, ip: true, created_at: true,
            usuario: { idusuario: true, nombreprincipal: true, email: true, },
          },
          relations: { usuario: true, },
          where: [
            { accion: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayBitacora: listBitacora,
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

  async store( createBitacoraDto: CreateBitacoraDto ) {
    try {
      const bitacoraCreate = this.bitacoraRepository.create( {
        ...createBitacoraDto,
        created_at: this.getDateTime(),
      } );
      return await this.bitacoraRepository.save( bitacoraCreate );
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async findOne(idbitacora: string) {
    try {

      const bitacoraFirst = await this.bitacoraRepository.findOne( {
        select: {
          idbitacora: true, accion: true, descripcion: true, uri: true,
          ip: true, event: true, tabla: true, fkidtabla: true, created_at: true,
          x_fecha: true, x_hora: true, concurrencia: true, estado: true,
          usuario: {
            idusuario: true, nombreprincipal: true, email: true, login: true,
            estado: true, concurrencia: true,
          },
        },
        relations: { usuario: true, },
        where: { idbitacora, },
      } );

      return bitacoraFirst;
    } catch (error) {
      return null;
    }
  }

  async show(idbitacora: string) {
    try {
      const bitacoraFirst = await this.findOne(idbitacora);
      if ( bitacoraFirst ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          bitacora: bitacoraFirst,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Bitacora no existe.',
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
