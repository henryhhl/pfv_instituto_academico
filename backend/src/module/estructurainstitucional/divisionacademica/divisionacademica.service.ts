import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { DivisionAcademica } from './entities/divisionacademica.entity';
import { CreateDivisionAcademicaDto } from './dto/create-divisionacademica.dto';
import { UpdateDivisionAcademicaDto } from './dto/update-divisionacademica.dto';

@Injectable()
export class DivisionAcademicaService {
  private readonly logger = new Logger('DivisionAcademicaService');

  constructor(
    @InjectRepository(DivisionAcademica)
    private readonly divionAcademicaRepository: Repository<DivisionAcademica>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listDivionAcademica = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listDivionAcademica, totalPagination] = await this.divionAcademicaRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listDivionAcademica, totalPagination] = await this.divionAcademicaRepository.findAndCount( {
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
        arrayDivisionAcademica: listDivionAcademica,
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

  async store(createDivisionacademicaDto: CreateDivisionAcademicaDto) {
    try {
      const divisionAcademica = this.divionAcademicaRepository.create( {
        sigla: createDivisionacademicaDto.sigla,
        descripcion: createDivisionacademicaDto.descripcion,
        orden: createDivisionacademicaDto.orden,
        created_at: this.getDateTime(),
      } );
      await this.divionAcademicaRepository.save( divisionAcademica );
      return {
        resp: 1, error: false,
        message: 'Division Academica registrado éxitosamente.',
        divisionAcademica: divisionAcademica,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(iddivisionacademica: string) {
    const divisionAcademica = await this.divionAcademicaRepository.findOneBy( {
      iddivisionacademica: iddivisionacademica,
    } );
    return divisionAcademica;
  }

  async edit(iddivisionacademica: string) {
    try {
      const divisionAcademica = await this.findOne(iddivisionacademica);
      if ( divisionAcademica ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          divisionAcademica: divisionAcademica,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Division Academica no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(iddivisionacademica: string) {
    try {
      const divisionAcademica = await this.findOne(iddivisionacademica);
      if ( divisionAcademica ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          divisionAcademica: divisionAcademica,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Division Academica no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(iddivisionacademica: string, updateDivisionacademicaDto: UpdateDivisionAcademicaDto) {
    const divisionAcademica = await this.findOne(iddivisionacademica);
    if ( divisionAcademica === null ) {
      return {
        resp: 0, error: false,
        message: 'Division Academica no existe.',
      };
    }
    const divisionAcademicaPreLoad = await this.divionAcademicaRepository.preload( {
      iddivisionacademica: iddivisionacademica,
      ...updateDivisionacademicaDto,
      concurrencia: divisionAcademica.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( divisionAcademicaPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Division Academica no existe.',
      };
    }
    const divionAcademicaUpdate = await this.divionAcademicaRepository.save( divisionAcademicaPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Division Academica actualizado éxitosamente.',
      divisionAcademica: divisionAcademica,
      divionAcademicaUpdate: divionAcademicaUpdate,
    };
  }

  async delete(iddivisionacademica: string) {
    try {
      let divisionAcademica = await this.findOne(iddivisionacademica);
      if ( divisionAcademica === null ) {
        return {
          resp: 0, error: true,
          message: 'Division Academica no existe.',
        };
      }
      await this.divionAcademicaRepository.remove( divisionAcademica );
      return {
        resp: 1, error: false,
        message: 'Division Academica eliminado éxitosamente.',
        divisionAcademica: divisionAcademica,
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
