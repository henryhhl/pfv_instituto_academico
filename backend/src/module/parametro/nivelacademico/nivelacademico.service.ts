import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateNivelAcademicoDto } from './dto/create-nivelacademico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivelacademico.dto';
import { NivelAcademico } from './entities/nivelacademico.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class NivelAcademicoService {
  private readonly logger = new Logger('NivelAcademicoService');

  constructor(
    @InjectRepository(NivelAcademico)
    private readonly nivelAcademicoRepository: Repository<NivelAcademico>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listNivelAcademico = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listNivelAcademico, totalPagination] = await this.nivelAcademicoRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listNivelAcademico, totalPagination] = await this.nivelAcademicoRepository.findAndCount( {
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
        arrayNivelAcademico: listNivelAcademico,
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

  async store(createNivelAcademicoDto: CreateNivelAcademicoDto) {
    try {
      const nivelAcademico = this.nivelAcademicoRepository.create( {
        sigla: createNivelAcademicoDto.sigla,
        descripcion: createNivelAcademicoDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.nivelAcademicoRepository.save( nivelAcademico );
      return {
        resp: 1, error: false,
        message: 'Nivel Academico registrado éxitosamente.',
        nivelAcademico: nivelAcademico,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idnivelacademico: string) {
    const nivelAcademico = await this.nivelAcademicoRepository.findOneBy( {
      idnivelacademico: idnivelacademico,
    } );
    return nivelAcademico;
  }

  async edit( idnivelacademico: string ) {
    try {
      const nivelAcademico = await this.findOne(idnivelacademico);
      if ( nivelAcademico ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            nivelAcademico: nivelAcademico,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Nivel Academico no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idnivelacademico: string ) {
    try {
      const nivelAcademico = await this.findOne(idnivelacademico);
      if ( nivelAcademico ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            nivelAcademico: nivelAcademico,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Nivel Academico no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idnivelacademico: string, updateNivelAcademicoDto: UpdateNivelAcademicoDto ) {
    const nivelAcademico = await this.findOne(idnivelacademico);
    if ( nivelAcademico === null ) {
      return {
        resp: 0, error: false,
        message: 'Nivel Academico no existe.',
      };
    }
    const nivelAcademicoPreLoad = await this.nivelAcademicoRepository.preload( {
      idnivelacademico: idnivelacademico,
      ...updateNivelAcademicoDto,
      concurrencia: nivelAcademico.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( nivelAcademicoPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Nivel Academico no existe.',
      };
    }
    const nivelAcademicoUpdate = await this.nivelAcademicoRepository.save( nivelAcademicoPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Nivel Academico actualizado éxitosamente.',
      nivelAcademico: nivelAcademico,
      nivelAcademicoUpdate: nivelAcademicoUpdate,
    };
  }

  async delete( idnivelacademico: string ) {
    try {
      let nivelAcademico = await this.findOne(idnivelacademico);
      if ( nivelAcademico === null ) {
        return {
          resp: 0, error: true,
          message: 'Nivel Academico no existe.',
        };
      }
      await this.nivelAcademicoRepository.remove( nivelAcademico );
      return {
        resp: 1, error: false,
        message: 'Nivel Academico eliminado éxitosamente.',
        nivelAcademico: nivelAcademico,
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
