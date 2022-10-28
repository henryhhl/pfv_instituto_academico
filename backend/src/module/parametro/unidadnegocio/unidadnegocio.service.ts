import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Like, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUnidadnegocioDto } from './dto/create-unidadnegocio.dto';
import { UpdateUnidadNegocioDto } from './dto/update-unidadnegocio.dto';
import { UnidadNegocio } from './entities/unidadnegocio.entity';

@Injectable()
export class UnidadNegocioService {

  private listUnidadNegocio: UnidadNegocio[] = [];
  private readonly logger = new Logger('TipoMateriaService');

  constructor(
    @InjectRepository(UnidadNegocio)
    private readonly unidadNegocioRepository: Repository<UnidadNegocio>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listUnidadNegocio = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listUnidadNegocio, totalPagination] = await this.unidadNegocioRepository.findAndCount( {
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
        [listUnidadNegocio, totalPagination] = await this.unidadNegocioRepository.findAndCount( {
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
        arrayUnidadNegocio: listUnidadNegocio,
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

  async store(createUnidadnegocioDto: CreateUnidadnegocioDto) {
    try {
      const unidadNegocio = this.unidadNegocioRepository.create( {
        sigla: createUnidadnegocioDto.sigla,
        descripcion: createUnidadnegocioDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.unidadNegocioRepository.save( unidadNegocio );
      return {
        resp: 1, error: false,
        message: 'Unidad Negocio registrado éxitosamente.',
        unidadNegocio: unidadNegocio,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idunidadnegocio: string) {
    const unidadNegocio = await this.unidadNegocioRepository.findOneBy( {
      idunidadnegocio: idunidadnegocio,
    } );
    return unidadNegocio;
  }

  async edit( idunidadnegocio: string ) {
    try {
      const unidadNegocio = await this.findOne(idunidadnegocio);
      if ( unidadNegocio ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            unidadNegocio: unidadNegocio,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Unidad Negocio no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idunidadnegocio: string ) {
    try {
      const unidadNegocio = await this.findOne(idunidadnegocio);
      if ( unidadNegocio ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            unidadNegocio: unidadNegocio,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Unidad Negocio no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  update(id: string, updateUnidadNegocioDto: UpdateUnidadNegocioDto) {
    let unidadNegocioDB = this.findOne(id);
    if ( unidadNegocioDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Negocio no existe.',
      };
    }

    // this.listUnidadNegocio = this.listUnidadNegocio.map( (unidadNegocio) => {
    //   if ( unidadNegocio.idunidadnegocio === id ) {
    //     unidadNegocioDB.updated_at = '';
    //     unidadNegocioDB = {
    //       ...unidadNegocioDB,
    //       ...updateUnidadNegocioDto,
    //       idunidadnegocio: id,
    //       concurrencia: unidadNegocio.concurrencia + 1,
    //     };
    //     return unidadNegocioDB;
    //   }
    //   return unidadNegocio;
    // } );
    return {
      resp: 1,
      error: false,
      message: 'Unidad Negocio actualizado éxitosamente.',
      unidadNegocio: unidadNegocioDB,
    };
  }

  async delete(idunidadnegocio: string) {
    try {
      let unidadNegocio = await this.findOne(idunidadnegocio);
      if ( unidadNegocio === null ) {
        return {
          resp: 0, error: true,
          message: 'Unidad Negocio no existe.',
        };
      }
      await this.unidadNegocioRepository.remove( unidadNegocio );
      return {
        resp: 1, error: false,
        message: 'Unidad Negocio eliminado éxitosamente.',
        unidadNegocio: unidadNegocio,
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
