import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateOfertaAcademicaDto } from './dto/create-ofertaacademica.dto';
import { UpdateOfertaAcademicaDto } from './dto/update-ofertaacademica.dto';
import { OfertaAcademica } from './entities/ofertaacademica.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class OfertaAcademicaService {
  private readonly logger = new Logger('OfertaAcademicaService');

  constructor(
    @InjectRepository(OfertaAcademica)
    private readonly ofertaAcademicaRepository: Repository<OfertaAcademica>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listOfertaAcademica = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listOfertaAcademica, totalPagination] = await this.ofertaAcademicaRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listOfertaAcademica, totalPagination] = await this.ofertaAcademicaRepository.findAndCount( {
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
        arrayOfertaAcademica: listOfertaAcademica,
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

  async store(createOfertaAcademicaDto: CreateOfertaAcademicaDto) {
    try {
      const ofertaAcademica = this.ofertaAcademicaRepository.create( {
        sigla: createOfertaAcademicaDto.sigla,
        descripcion: createOfertaAcademicaDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.ofertaAcademicaRepository.save( ofertaAcademica );
      return {
        resp: 1, error: false,
        message: 'Oferta Academica registrado éxitosamente.',
        ofertaAcademica: ofertaAcademica,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idofertaacademica: string) {
    const ofertaAcademica = await this.ofertaAcademicaRepository.findOneBy( {
      idofertaacademica: idofertaacademica,
    } );
    return ofertaAcademica;
  }

  async edit( idofertaacademica: string ) {
    try {
      const ofertaAcademica = await this.findOne(idofertaacademica);
      if ( ofertaAcademica ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            ofertaAcademica: ofertaAcademica,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Oferta Academica no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idofertaacademica: string ) {
    try {
      const ofertaAcademica = await this.findOne(idofertaacademica);
      if ( ofertaAcademica ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            ofertaAcademica: ofertaAcademica,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Oferta Academica no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idofertaacademica: string, updateOfertaAcademicaDto: UpdateOfertaAcademicaDto ) {
    const ofertaAcademica = await this.findOne(idofertaacademica);
    if ( ofertaAcademica === null ) {
      return {
        resp: 0, error: false,
        message: 'Oferta Academica no existe.',
      };
    }
    const ofertaAcademicaPreLoad = await this.ofertaAcademicaRepository.preload( {
      idofertaacademica: idofertaacademica,
      ...updateOfertaAcademicaDto,
      concurrencia: ofertaAcademica.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( ofertaAcademicaPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Oferta Academica no existe.',
      };
    }
    const ofertaAcademicaUpdate = await this.ofertaAcademicaRepository.save( ofertaAcademicaPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Oferta Academica actualizado éxitosamente.',
      ofertaAcademica: ofertaAcademica,
      ofertaAcademicaUpdate: ofertaAcademicaUpdate,
    };
  }

  async delete( idofertaacademica: string ) {
    try {
      let ofertaAcademica = await this.findOne(idofertaacademica);
      if ( ofertaAcademica === null ) {
        return {
          resp: 0, error: true,
          message: 'Oferta Academica no existe.',
        };
      }
      await this.ofertaAcademicaRepository.remove( ofertaAcademica );
      return {
        resp: 1, error: false,
        message: 'Oferta Academica eliminado éxitosamente.',
        ofertaAcademica: ofertaAcademica,
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
