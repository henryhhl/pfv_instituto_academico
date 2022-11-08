import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Aula } from './entities/aula.entity';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class AulaService {
  private readonly logger = new Logger('AulaService');

  constructor(
    @InjectRepository(Aula)
    private readonly aulaRepository: Repository<Aula>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listAula = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listAula, totalPagination] = await this.aulaRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listAula, totalPagination] = await this.aulaRepository.findAndCount( {
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayAula: listAula,
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

  async store(createAulaDto: CreateAulaDto) {
    try {
      const aula = this.aulaRepository.create( {
        ...createAulaDto,
        created_at: this.getDateTime(),
      } );
      await this.aulaRepository.save( aula );
      return {
        resp: 1, error: false,
        message: 'Aula registrado éxitosamente.',
        aula: aula,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idaula: string) {
    const aula = await this.aulaRepository.findOneBy( {
      idaula: idaula,
    } );
    return aula;
  }

  async edit(idaula: string) {
    try {
      const aula = await this.findOne(idaula);
      if ( aula ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          aula: aula,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Aula no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idaula: string) {
    try {
      const aula = await this.findOne(idaula);
      if ( aula ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          aula: aula,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Aula no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idaula: string, updateAulaDto: UpdateAulaDto) {
    try {
      const aula = await this.findOne(idaula);
      const aulaPreLoad = await this.aulaRepository.preload( {
        idaula: idaula,
        ...updateAulaDto,
        concurrencia: aula.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( aulaPreLoad === null || aula === null ) {
        return {
          resp: 0, error: false,
          message: 'Aula no existe.',
        };
      }
      const aulaUpdate = await this.aulaRepository.save( aulaPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Aula actualizado éxitosamente.',
        aula: aula,
        aulaUpdate: aulaUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idaula: string) {
    try {
      let aula = await this.findOne(idaula);
      if ( aula === null ) {
        return {
          resp: 0, error: true,
          message: 'Aula no existe.',
        };
      }
      await this.aulaRepository.remove( aula );
      return {
        resp: 1, error: false,
        message: 'Aula eliminado éxitosamente.',
        aula: aula,
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
