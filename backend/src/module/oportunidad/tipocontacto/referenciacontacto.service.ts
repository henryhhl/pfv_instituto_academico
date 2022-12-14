
import { ILike, Repository } from 'typeorm'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateReferenciaContactoDto } from './dto/create-referenciacontacto.dto';
import { UpdateReferenciaContactoDto } from './dto/update-referenciacontacto.dto';
import { ReferenciaContacto } from './entities/referenciacontacto.entity';

@Injectable()
export class ReferenciaContactoService {
  private readonly logger = new Logger('TipoContactoService');

  constructor(
    @InjectRepository(ReferenciaContacto)
    private readonly tipoContactoRepository: Repository<ReferenciaContacto>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = true, } = paginationDto;
      let listTipoContacto = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listTipoContacto, totalPagination] = await this.tipoContactoRepository.findAndCount( {
          take: limit,
          skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), }
          ],
          order: {
            created_at: "DESC",
          },
        } );
      } else {
        [listTipoContacto, totalPagination] = await this.tipoContactoRepository.findAndCount( {
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), }
          ],
          order: {
            created_at: "DESC",
          },
        } );
      }
      
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayTipoContacto: listTipoContacto,
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

  async store(createtipoContactoDto: CreateReferenciaContactoDto) {
    try {
      const existsDescripcion = await this.existsDescripcion( createtipoContactoDto.descripcion );
      if ( existsDescripcion === true ) {
        return {
          resp: 0, error: false,
          message: 'Tipo ya existente, favor ingresar uno nuevo.',
        };
      } 
      const tipoContacto = this.tipoContactoRepository.create( {
        ...createtipoContactoDto,
        created_at: this.getDateTime(),
      } );
      await this.tipoContactoRepository.save( tipoContacto );
  
      return {
        resp: 1, error: false,
        message: 'Tipo Contacto registrado éxitosamente.',
        tipoContacto: tipoContacto,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idtipocontacto: string) {
    const tipoContacto = await this.tipoContactoRepository.findOneBy( {
      idtipocontacto,
    } );
    return tipoContacto;
  }

  private async existsDescripcion(descripcion: string) {
    const tipoContacto = await this.tipoContactoRepository.findOne( {
      where: { descripcion: descripcion, },
      order: { created_at: 'DESC', },
    } );
    return tipoContacto ? true : false;
  }

  async edit(idtipocontacto: string) {
    try {
      const tipoContacto = await this.findOne(idtipocontacto);
      if ( tipoContacto ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            tipoContacto: tipoContacto,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Contacto no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idtipocontacto: string) {
    try {
      const tipoContacto = await this.findOne(idtipocontacto);
      if ( tipoContacto ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            tipoContacto: tipoContacto,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Contacto no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idtipocontacto: string, updateTipoContactoDto: UpdateReferenciaContactoDto ) {
    const tipoContacto = await this.findOne(idtipocontacto);
    if ( tipoContacto === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo Contacto no existe.',
      };
    }
    if ( tipoContacto.descripcion !== updateTipoContactoDto.descripcion ) {
      const existsDescripcion = await this.existsDescripcion( updateTipoContactoDto.descripcion );
      if ( existsDescripcion === true ) {
        return {
          resp: 0, error: false,
          message: 'Tipo ya existente, favor ingresar uno nuevo.',
        };
      } 
    }
    const tipoContactoPreLoad = await this.tipoContactoRepository.preload( {
      idtipocontacto: idtipocontacto,
      ...updateTipoContactoDto,
      concurrencia: tipoContacto.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( tipoContactoPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo Contacto no existe.',
      };
    }
    const tipoContactoUpdate = await this.tipoContactoRepository.save( tipoContactoPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Tipo Contacto actualizado éxitosamente.',
      tipoContacto: tipoContactoUpdate,
    };
  }

  async delete( idtipocontacto: string ) {
    try {
      let tipoContacto = await this.findOne(idtipocontacto);
      if ( tipoContacto === null ) {
        return {
          resp: 0, error: true,
          message: 'Tipo Contacto no existe.',
        };
      }
      await this.tipoContactoRepository.remove( tipoContacto );
      return {
        resp: 1, error: false,
        message: 'Tipo Contacto eliminado éxitosamente.',
        tipoContacto: tipoContacto,
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
