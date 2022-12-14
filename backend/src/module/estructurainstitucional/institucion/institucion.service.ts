import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Institucion } from './entities/institucion.entity';
import { CreateInstitucionDto } from './dto/create-institucion.dto';
import { UpdateInstitucionDto } from './dto/update-institucion.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class InstitucionService {
  private readonly logger = new Logger('InstitucionService');

  constructor(
    @InjectRepository(Institucion)
    private readonly institucionRepository: Repository<Institucion>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listInstitucion = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listInstitucion, totalPagination] = await this.institucionRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
            { nit: ILike( '%' + search + '%', ), },
            { ciudad: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listInstitucion, totalPagination] = await this.institucionRepository.findAndCount( {
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
            { nit: ILike( '%' + search + '%', ), },
            { ciudad: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayInstitucion: listInstitucion,
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

  async store(createInstitucionDto: CreateInstitucionDto) {
    try {
      const institucion = this.institucionRepository.create( {
        fkidciudad: createInstitucionDto.fkidciudad,
        ciudad: createInstitucionDto.ciudad,
        sigla: createInstitucionDto.sigla,
        descripcion: createInstitucionDto.descripcion,
        nit: createInstitucionDto.nit,
        telefono: createInstitucionDto.telefono,
        celular: createInstitucionDto.celular,
        direccion: createInstitucionDto.direccion,
        email: createInstitucionDto.email,
        created_at: this.getDateTime(),
      } );
      await this.institucionRepository.save( institucion );
      return {
        resp: 1, error: false,
        message: 'Institución registrado éxitosamente.',
        institucion: institucion,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idinstitucion: string) {
    const institucion = await this.institucionRepository.findOneBy( {
      idinstitucion: idinstitucion,
    } );
    return institucion;
  }

  async edit(idinstitucion: string) {
    try {
      const institucion = await this.findOne(idinstitucion);
      if ( institucion ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          institucion: institucion,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Institución no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idinstitucion: string) {
    try {
      const institucion = await this.findOne(idinstitucion);
      if ( institucion ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          institucion: institucion,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Institución no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idinstitucion: string, updateInstitucionDto: UpdateInstitucionDto) {
    const institucion = await this.findOne(idinstitucion);
    if ( institucion === null ) {
      return {
        resp: 0, error: false,
        message: 'Institución no existe.',
      };
    }
    const institucionPreLoad = await this.institucionRepository.preload( {
      idinstitucion: idinstitucion,
      ...updateInstitucionDto,
      concurrencia: institucion.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( institucionPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Institución no existe.',
      };
    }
    const institucionUpdate = await this.institucionRepository.save( institucionPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Institución actualizado éxitosamente.',
      institucion: institucion,
      institucionUpdate: institucionUpdate,
    };
  }

  async delete(idinstitucion: string) {
    try {
      let institucion = await this.findOne(idinstitucion);
      if ( institucion === null ) {
        return {
          resp: 0, error: true,
          message: 'Institución no existe.',
        };
      }
      await this.institucionRepository.remove( institucion );
      return {
        resp: 1, error: false,
        message: 'Institución eliminado éxitosamente.',
        institucion: institucion,
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
