import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Negocio } from './entities/negocio.entity';
import { StoreNegocioDto } from './dto/store-negocio.dto';
import { UpdateNegocioDto } from './dto/update-negocio.dto';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { OportunidadService } from '../oportunidad/oportunidad.service';

@Injectable()
export class NegocioService {
  private readonly logger = new Logger('NegocioService');

  constructor(
    @InjectRepository(Negocio)
    private readonly negocioRepository: Repository<Negocio>,

    private readonly oportunidadService: OportunidadService,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listNegocio = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listNegocio, totalPagination] = await this.negocioRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listNegocio, totalPagination] = await this.negocioRepository.findAndCount( {
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayNegocio: listNegocio,
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

  async create( createNegocioDto: CreateNegocioDto ) {
    try {
      const oportunidad = await this.oportunidadService.findOne( createNegocioDto.fkidoportunidad );
      if ( oportunidad === null ) {
        return {
          resp: 0, error: false,
          message: 'Oportunidad no existe.',
        };
      }
      let listOportunidadNegocio = [];
      let totalNegocio = 0;
      [listOportunidadNegocio, totalNegocio] = await this.negocioRepository.findAndCount( {
        where: [
          { oportunidad: oportunidad, },
        ],
        order: { created_at: "DESC", },
      } );
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        oportunidad: oportunidad,
        arrayNegocio: listOportunidadNegocio,
        cantidadNegocio: (totalNegocio + 1),
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
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

  async store(createNegocioDto: StoreNegocioDto) {
    try {
      const oportunidad = await this.oportunidadService.findOne( createNegocioDto.fkidoportunidad );
      if ( oportunidad === null ) {
        return {
          resp: 0, error: false,
          message: 'Oportunidad no existe.',
        };
      }
      const { fkidoportunidad, ...toCreate } = createNegocioDto;
      const negocio = this.negocioRepository.create( {
        ...toCreate,
        oportunidad: oportunidad,
        created_at: this.getDateTime(),
      } );
      const negocioStore = await this.negocioRepository.save( negocio );
      const oportunidadUpdate = await this.oportunidadService.findOne( createNegocioDto.fkidoportunidad );

      return {
        resp: 1, error: false,
        message: 'Negocio registrado éxitosamente.',
        negocio: negocioStore,
        oportunidad: oportunidadUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idnegocio: string) {
    const negocio = await this.negocioRepository.findOne( {
      where: { idnegocio: idnegocio },
      relations: {
        oportunidad: true,
        arrayactividad: true,
      },
      order: { created_at: 'ASC', },
    } );
    return negocio;
  }

  async edit(idnegocio: string) {
    try {
      const negocio = await this.findOne(idnegocio);
      if ( negocio ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          negocio: negocio,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Negocio no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idnegocio: string) {
    try {
      const negocio = await this.findOne(idnegocio);
      if ( negocio ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          negocio: negocio,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Negocio no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idnegocio: string, updateNegocioDto: UpdateNegocioDto) {
    try {
      const oportunidad = await this.oportunidadService.findOne( updateNegocioDto.fkidoportunidad );
      if ( oportunidad === null ) {
        return {
          resp: 0, error: false,
          message: 'Oportunidad no existe.',
        };
      }
      const negocio = await this.findOne(idnegocio);
      if ( negocio === null ) {
        return {
          resp: 0, error: false,
          message: 'Negocio no existe.',
        };
      }
      const { fkidoportunidad, ...toUpdate } = updateNegocioDto;
      const negocioPreLoad = await this.negocioRepository.preload( {
        idnegocio: idnegocio,
        ...toUpdate,
        oportunidad: oportunidad,
        concurrencia: negocio.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( negocioPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Negocio no existe.',
        };
      }
      const negocioUpdate = await this.negocioRepository.save( negocioPreLoad );
      const oportunidadUpdate = await this.oportunidadService.findOne( updateNegocioDto.fkidoportunidad );
      return {
        resp: 1,
        error: false,
        message: 'Negocio actualizado éxitosamente.',
        negocio: negocioUpdate,
        oportunidad: oportunidadUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idnegocio: string) {
    try {
      let negocio = await this.findOne(idnegocio);
      if ( negocio === null ) {
        return {
          resp: 0, error: true,
          message: 'Negocio no existe.',
        };
      }
      if ( negocio.arrayactividad.length > 0 ) {
        return {
          resp: 0, error: true,
          message: 'Negocio no eliminado, ya que tiene actividades registrados.',
        };
      }
      await this.negocioRepository.remove( negocio );
      const oportunidadUpdate = await this.oportunidadService.findOne( negocio.oportunidad.idoportunidad );
      return {
        resp: 1, error: false,
        message: 'Negocio eliminado éxitosamente.',
        oportunidad: oportunidadUpdate,
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
