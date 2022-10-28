import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateUnidadAdministrativaDto } from './dto/create-unidadadministrativa.dto';
import { UpdateUnidadAdministrativaDto } from './dto/update-unidadadministrativa.dto';
import { UnidadAdministrativa } from './entities/unidadadministrativa.entity';

@Injectable()
export class UnidadAdministrativaService {
  private listUnidadAdministrativa: UnidadAdministrativa[] = [];
  private readonly logger = new Logger('UnidadAdministrativaService');

  constructor(
    @InjectRepository(UnidadAdministrativa)
    private readonly unidadAdministrativaRepository: Repository<UnidadAdministrativa>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listUnidadAdministrativa = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listUnidadAdministrativa, totalPagination] = await this.unidadAdministrativaRepository.findAndCount( {
          take: limit,
          skip: offset,
          where: { },
          order: {
            created_at: "DESC",
          },
        } );
      } else {
        [listUnidadAdministrativa, totalPagination] = await this.unidadAdministrativaRepository.findAndCount( {
          where: { },
          order: {
            created_at: "DESC",
          },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayUnidadAdministrativa: listUnidadAdministrativa,
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

  async store(createUnidadadministrativaDto: CreateUnidadAdministrativaDto) {
    try {
      const unidadAdministrativa = this.unidadAdministrativaRepository.create( {
        fkidunidadnegocio: createUnidadadministrativaDto.fkidunidadnegocio,
        unidadnegocio: createUnidadadministrativaDto.unidadnegocio,
        sigla: createUnidadadministrativaDto.sigla,
        descripcion: createUnidadadministrativaDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.unidadAdministrativaRepository.save( unidadAdministrativa );
      return {
        resp: 1, error: false,
        message: 'Unidad Administrativa registrado éxitosamente.',
        unidadAdministrativa: unidadAdministrativa,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idunidadadministrativa: string) {
    const unidadAdministrativa = await this.unidadAdministrativaRepository.findOneBy( {
      idunidadadministrativa: idunidadadministrativa,
    } );
    return unidadAdministrativa;
  }

  async edit(idunidadadministrativa: string) {
    try {
      const unidadAdministrativa = await this.findOne(idunidadadministrativa);
      if ( unidadAdministrativa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          unidadAdministrativa: unidadAdministrativa,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Unidad Administrativa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idunidadadministrativa: string) {
    try {
      const unidadAdministrativa = await this.findOne(idunidadadministrativa);
      if ( unidadAdministrativa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          unidadAdministrativa: unidadAdministrativa,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Unidad Administrativa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  update(id: string, updateUnidadadministrativaDto: UpdateUnidadAdministrativaDto) {
    let unidadAdministrativaDB = this.findOne(id);
    if ( unidadAdministrativaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Administrativa no existe.',
      };
    }

    // this.listUnidadAdministrativa = this.listUnidadAdministrativa.map( (unidadAdministrativa) => {
    //   if ( unidadAdministrativa.idunidadadministrativa === id ) {
    //     unidadAdministrativaDB.updated_at = '';
    //     unidadAdministrativaDB = {
    //       ...unidadAdministrativaDB,
    //       ...updateUnidadadministrativaDto,
    //       idunidadadministrativa: id,
    //       concurrencia: unidadAdministrativa.concurrencia + 1,
    //     };
    //     return unidadAdministrativaDB;
    //   }
    //   return unidadAdministrativa;
    // } );
    return {
      resp: 1,
      error: false,
      message: 'Unidad Administrativa actualizado éxitosamente.',
      unidadAdministrativa: unidadAdministrativaDB,
    };
  }

  async delete(idunidadadministrativa: string) {
    try {
      let unidadAdministrativa = await this.findOne(idunidadadministrativa);
      if ( unidadAdministrativa === null ) {
        return {
          resp: 0, error: true,
          message: 'Unidad Administrativa no existe.',
        };
      }
      await this.unidadAdministrativaRepository.remove( unidadAdministrativa );
      return {
        resp: 1, error: false,
        message: 'Unidad Administrativa eliminado éxitosamente.',
        unidadAdministrativa: unidadAdministrativa,
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
