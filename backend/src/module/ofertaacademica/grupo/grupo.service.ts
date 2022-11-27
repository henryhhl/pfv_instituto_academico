import { Injectable, Logger } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Grupo } from './entities/grupo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class GrupoService {
  private readonly logger = new Logger('GrupoService');

  constructor(
    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listGrupo = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listGrupo, totalPagination] = await this.grupoRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { sigla: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listGrupo, totalPagination] = await this.grupoRepository.findAndCount( {
          where: [
            { sigla: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayGrupo: listGrupo,
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

  async store(createGrupoDto: CreateGrupoDto) {
    try {
      const grupo = this.grupoRepository.create( {
        ...createGrupoDto,
        created_at: this.getDateTime(),
      } );
      await this.grupoRepository.save( grupo );
      return {
        resp: 1, error: false,
        message: 'Grupo registrado éxitosamente.',
        grupo: grupo,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idgrupo: string) {
    const grupo = await this.grupoRepository.findOneBy( {
      idgrupo,
    } );
    return grupo;
  }

  async edit(idgrupo: string) {
    try {
      const grupo = await this.findOne(idgrupo);
      if ( grupo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          grupo: grupo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Grupo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idgrupo: string) {
    try {
      const grupo = await this.findOne(idgrupo);
      if ( grupo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          grupo: grupo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Grupo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idgrupo: string, updateGrupoDto: UpdateGrupoDto) {
    try {
      const grupo = await this.findOne(idgrupo);
      if ( grupo === null ) {
        return {
          resp: 0, error: false,
          message: 'Grupo no existe.',
        };
      }
      const grupoPreLoad = await this.grupoRepository.preload( {
        idgrupo: idgrupo,
        ...updateGrupoDto,
        concurrencia: grupo.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( grupoPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Grupo no existe.',
        };
      }
      const grupoUpdate = await this.grupoRepository.save( grupoPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Grupo actualizado éxitosamente.',
        grupo: grupoUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idgrupo: string) {
    try {
      let grupo = await this.findOne(idgrupo);
      if ( grupo === null ) {
        return {
          resp: 0, error: true,
          message: 'Grupo no existe.',
        };
      }
      await this.grupoRepository.remove( grupo );
      return {
        resp: 1, error: false,
        message: 'Grupo eliminado éxitosamente.',
        grupo: grupo,
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
