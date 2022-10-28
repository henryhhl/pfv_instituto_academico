import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUnidadAcademicaDto } from './dto/create-unidadacademica.dto';
import { UpdateUnidadAcademicaDto } from './dto/update-unidadacademica.dto';
import { UnidadAcademica } from './entities/unidadacademica.entity';

@Injectable()
export class UnidadacademicaService {
  private listUnidadAcademica: UnidadAcademica[] = [];
  private readonly logger = new Logger('UnidadAcademicaService');

  constructor(
    @InjectRepository(UnidadAcademica)
    private readonly unidadAcademicaRepository: Repository<UnidadAcademica>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listUnidadAcademica = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listUnidadAcademica, totalPagination] = await this.unidadAcademicaRepository.findAndCount( {
          take: limit,
          skip: offset,
          where: { },
          order: {
            created_at: "DESC",
          },
        } );
      } else {
        [listUnidadAcademica, totalPagination] = await this.unidadAcademicaRepository.findAndCount( {
          where: { },
          order: {
            created_at: "DESC",
          },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayUnidadAcademica: listUnidadAcademica,
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

  async create(createUnidadacademicaDto: CreateUnidadAcademicaDto) {
    try {
      const unidadAcademica = this.unidadAcademicaRepository.create( {
        fkidunidadnegocio: createUnidadacademicaDto.fkidunidadnegocio,
        unidadnegocio: createUnidadacademicaDto.unidadnegocio,
        fkidunidadadministrativa: createUnidadacademicaDto.fkidunidadadministrativa,
        unidadadministrativa: createUnidadacademicaDto.unidadadministrativa,
        codigo: createUnidadacademicaDto.codigo,
        sigla: createUnidadacademicaDto.sigla,
        descripcion: createUnidadacademicaDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.unidadAcademicaRepository.save( unidadAcademica );
      return {
        resp: 1, error: false,
        message: 'Unidad Academica registrado éxitosamente.',
        unidadAcademica: unidadAcademica,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idunidadacademica: string) {
    const unidadAcademica = await this.unidadAcademicaRepository.findOneBy( {
      idunidadacademica: idunidadacademica,
    } );
    return unidadAcademica;
  }

  async edit(idunidadacademica: string) {
    try {
      const unidadAcademica = await this.findOne(idunidadacademica);
      if ( unidadAcademica ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          unidadAcademica: unidadAcademica,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Unidad Academica no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idunidadacademica: string) {
    try {
      const unidadAcademica = await this.findOne(idunidadacademica);
      if ( unidadAcademica ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          unidadAcademica: unidadAcademica,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Unidad Academica no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idunidadacademica: string, updateUnidadacademicaDto: UpdateUnidadAcademicaDto ) {
    const unidadAcademica = await this.findOne(idunidadacademica);
    if ( unidadAcademica === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Academica no existe.',
      };
    }
    const unidadAcademicaPreLoad = await this.unidadAcademicaRepository.preload( {
      idunidadacademica: idunidadacademica,
      ...updateUnidadacademicaDto,
      concurrencia: unidadAcademica.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( unidadAcademicaPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Unidad Academica no existe.',
      };
    }
    const unidadAcademicaUpdate = await this.unidadAcademicaRepository.save( unidadAcademicaPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Unidad Academica actualizado éxitosamente.',
      unidadAcademica: unidadAcademica,
      unidadAcademicaUpdate: unidadAcademicaUpdate,
    };
  }

  async delete(idunidadacademica: string) {
    try {
      let unidadAcademica = await this.findOne(idunidadacademica);
      if ( unidadAcademica === null ) {
        return {
          resp: 0, error: true,
          message: 'Unidad Academica no existe.',
        };
      }
      await this.unidadAcademicaRepository.remove( unidadAcademica );
      return {
        resp: 1, error: false,
        message: 'Unidad Academica eliminado éxitosamente.',
        unidadAcademica: unidadAcademica,
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
