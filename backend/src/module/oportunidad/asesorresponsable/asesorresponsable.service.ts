import { Repository, Like, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { AsesorResponsable } from './entities/asesorresponsable.entity';
import { CreateAsesorResponsableDto } from './dto/create-asesorresponsable.dto';
import { UpdateAsesorResponsableDto } from './dto/update-asesorresponsable.dto';

@Injectable()
export class AsesorResponsableService {
  private readonly logger = new Logger('AsesorResponsableService');

  constructor(
    @InjectRepository(AsesorResponsable)
    private readonly asesorResponsableRepository: Repository<AsesorResponsable>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listAsesorResponsable = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listAsesorResponsable, totalPagination] = await this.asesorResponsableRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { nombreprincipal: ILike( '%' + search + '%', ), },
            { nombreadicional: ILike( '%' + search + '%', ), },
            { apellidoprimero: ILike( '%' + search + '%', ), },
            { apellidosegundo: ILike( '%' + search + '%', ), },
            { numeroidentificacion: ILike( '%' + search + '%', ), },
            { ciudadnacimiento: ILike( '%' + search + '%', ), },
            { tipoidentificacion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listAsesorResponsable, totalPagination] = await this.asesorResponsableRepository.findAndCount( {
          where: [
            { nombreprincipal: ILike( '%' + search + '%', ), },
            { nombreadicional: ILike( '%' + search + '%', ), },
            { apellidoprimero: ILike( '%' + search + '%', ), },
            { apellidosegundo: ILike( '%' + search + '%', ), },
            { numeroidentificacion: ILike( '%' + search + '%', ), },
            { ciudadnacimiento: ILike( '%' + search + '%', ), },
            { tipoidentificacion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayAsesorResponsable: listAsesorResponsable,
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

  async store(createAsesorresponsableDto: CreateAsesorResponsableDto) {
    try {
      const asesorResponsable = this.asesorResponsableRepository.create( {
        ...createAsesorresponsableDto,
        created_at: this.getDateTime(),
      } );
      await this.asesorResponsableRepository.save( asesorResponsable );
      return {
        resp: 1, error: false,
        message: 'Asesor Responsable registrado éxitosamente.',
        asesorResponsable: asesorResponsable,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idasesorresponsable: string) {
    const asesorResponsable = await this.asesorResponsableRepository.findOneBy( {
      idasesorresponsable,
    } );
    return asesorResponsable;
  }

  async edit(idasesorresponsable: string) {
    try {
      const asesorResponsable = await this.findOne(idasesorresponsable);
      if ( asesorResponsable ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          asesorResponsable: asesorResponsable,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Asesor Responsable no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idasesorresponsable: string) {
    try {
      const asesorResponsable = await this.findOne(idasesorresponsable);
      if ( asesorResponsable ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          asesorResponsable: asesorResponsable,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Asesor Responsable no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idasesorresponsable: string, updateAsesorresponsableDto: UpdateAsesorResponsableDto) {
    try {
      const asesorResponsable = await this.findOne(idasesorresponsable);
      if ( asesorResponsable === null ) {
        return {
          resp: 0, error: false,
          message: 'Asesor Responsable no existe.',
        };
      }
      const asesorResponsablePreLoad = await this.asesorResponsableRepository.preload( {
        idasesorresponsable: idasesorresponsable,
        ...updateAsesorresponsableDto,
        concurrencia: asesorResponsable.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( asesorResponsablePreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Asesor Responsable no existe.',
        };
      }
      const asesorResponsableUpdate = await this.asesorResponsableRepository.save( asesorResponsablePreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Asesor Responsable actualizado éxitosamente.',
        asesorResponsable: asesorResponsableUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idasesorresponsable: string) {
    try {
      let asesorResponsable = await this.findOne(idasesorresponsable);
      if ( asesorResponsable === null ) {
        return {
          resp: 0, error: true,
          message: 'Asesor Responsable no existe.',
        };
      }
      await this.asesorResponsableRepository.remove( asesorResponsable );
      return {
        resp: 1, error: false,
        message: 'Asesor Responsable eliminado éxitosamente.',
        asesorResponsable: asesorResponsable,
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
