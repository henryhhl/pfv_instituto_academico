import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateModalidadAcademicaDto } from './dto/create-modalidadacademica.dto';
import { UpdateModalidadAcademicaDto } from './dto/update-modalidadacademica.dto';
import { ModalidadAcademica } from './entities/modalidadacademica.entity';

@Injectable()
export class ModalidadAcademicaService {
  private readonly logger = new Logger('ModalidadAcademicaService');

  constructor(
    @InjectRepository(ModalidadAcademica)
    private readonly modalidadAcademicaRepository: Repository<ModalidadAcademica>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listModalidadAcademica = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listModalidadAcademica, totalPagination] = await this.modalidadAcademicaRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listModalidadAcademica, totalPagination] = await this.modalidadAcademicaRepository.findAndCount( {
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
        arrayModalidadAcademica: listModalidadAcademica,
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

  async store(createModalidadAcademicaDto: CreateModalidadAcademicaDto) {
    try {
      const modalidadAcademica = this.modalidadAcademicaRepository.create( {
        sigla: createModalidadAcademicaDto.sigla,
        descripcion: createModalidadAcademicaDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.modalidadAcademicaRepository.save( modalidadAcademica );
      return {
        resp: 1, error: false,
        message: 'Modalidad Academica registrado éxitosamente.',
        modalidadAcademica: modalidadAcademica,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idmodalidadacademica: string) {
    const modalidadAcademica = await this.modalidadAcademicaRepository.findOneBy( {
      idmodalidadacademica: idmodalidadacademica,
    } );
    return modalidadAcademica;
  }

  async edit( idmodalidadacademica: string ) {
    try {
      const modalidadAcademica = await this.findOne(idmodalidadacademica);
      if ( modalidadAcademica ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            modalidadAcademica: modalidadAcademica,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Modalidad Academica no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idmodalidadacademica: string ) {
    try {
      const modalidadAcademica = await this.findOne(idmodalidadacademica);
      if ( modalidadAcademica ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            modalidadAcademica: modalidadAcademica,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Modalidad Academica no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idmodalidadacademica: string, updateModalidadAcademicaDto: UpdateModalidadAcademicaDto ) {
    const modalidadAcademica = await this.findOne(idmodalidadacademica);
    if ( modalidadAcademica === null ) {
      return {
        resp: 0, error: false,
        message: 'Modalidad Academica no existe.',
      };
    }
    const modalidadAcademicaPreLoad = await this.modalidadAcademicaRepository.preload( {
      idmodalidadacademica: idmodalidadacademica,
      ...updateModalidadAcademicaDto,
      concurrencia: modalidadAcademica.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( modalidadAcademicaPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Modalidad Academica no existe.',
      };
    }
    const modalidadAcademicaUpdate = await this.modalidadAcademicaRepository.save( modalidadAcademicaPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Modalidad Academica actualizado éxitosamente.',
      modalidadAcademica: modalidadAcademica,
      modalidadAcademicaUpdate: modalidadAcademicaUpdate,
    };
  }

  async delete(idmodalidadacademica: string) {
    try {
      let modalidadAcademica = await this.findOne(idmodalidadacademica);
      if ( modalidadAcademica === null ) {
        return {
          resp: 0, error: true,
          message: 'Modalidad Academica no existe.',
        };
      }
      await this.modalidadAcademicaRepository.remove( modalidadAcademica );
      return {
        resp: 1, error: false,
        message: 'Modalidad Academica eliminado éxitosamente.',
        modalidadAcademica: modalidadAcademica,
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
