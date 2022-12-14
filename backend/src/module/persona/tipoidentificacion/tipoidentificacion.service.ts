import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { TipoIdentificacion } from './entities/tipoidentificacion.entity';
import { BitacoraService } from '../../seguridad/bitacora/bitacora.service';
import { CreateTipoIdentificacionDto } from './dto/create-tipoidentificacion.dto';
import { UpdateTipoIdentificacionDto } from './dto/update-tipoidentificacion.dto';
import { Usuario } from '../../seguridad/usuario/entities/usuario.entity';

@Injectable()
export class TipoIdentificacionService {
  private readonly logger = new Logger('TipoIdentificacionService');

  constructor(
    @InjectRepository(TipoIdentificacion)
    private readonly tipoIdentificacionRepository: Repository<TipoIdentificacion>,

    private readonly bitacoraService: BitacoraService,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listTipoIdentificacion = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listTipoIdentificacion, totalPagination] = await this.tipoIdentificacionRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listTipoIdentificacion, totalPagination] = await this.tipoIdentificacionRepository.findAndCount( {
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
        arrayTipoIdentificacion: listTipoIdentificacion,
        pagination: {
          total: totalPagination,
        },
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar informaci??n con el servidor.',
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

  async store(createTipoidentificacionDto: CreateTipoIdentificacionDto, ip: string, usuario: Usuario) {
    try {
      const tipoIdentificacionCreate = this.tipoIdentificacionRepository.create( {
        sigla: createTipoidentificacionDto.sigla,
        descripcion: createTipoidentificacionDto.descripcion,
        created_at: this.getDateTime(),
      } );
      const tipoIdentificacionSave = await this.tipoIdentificacionRepository.save( tipoIdentificacionCreate );
      const bitacoraSave = await this.bitacoraService.store( {
        usuario: usuario,
        fkidtabla: tipoIdentificacionSave.idtipoidentificacion,
        tabla: 'tipoidentificacion',
        accion: 'Registrar Tipo de Identificaci??n',
        descripcion: `Se realizo con ??xito al registrar tipo de Identificaci??n: ${tipoIdentificacionSave.descripcion}`,
        event: 'store',
        ip: ip, uri: '/api/v1/tipoidentificacion/store',
        x_fecha: createTipoidentificacionDto.x_fecha, x_hora: createTipoidentificacionDto.x_hora,
      } );
      return {
        resp: 1, error: false,
        message: 'Tipo Identificaci??n registrado ??xitosamente.',
        tipoIdentificacion: tipoIdentificacionSave,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar informaci??n con el servidor.',
      };
    }
  }

  async findOne(idtipoidentificacion: string) {
    try {
      const tipoIdentificacion = await this.tipoIdentificacionRepository.findOneBy( {
        idtipoidentificacion: idtipoidentificacion,
      } );
      return tipoIdentificacion;
    } catch (error) {
      return null;
    }
  }

  async edit(idtipoidentificacion: string) {
    try {
      const tipoIdentificacion = await this.findOne(idtipoidentificacion);
      if ( tipoIdentificacion ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoIdentificacion: tipoIdentificacion,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Identificacion no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar informaci??n con el servidor.',
      };
    }
  }

  async show(idtipoidentificacion: string) {
    try {
      const tipoIdentificacion = await this.findOne(idtipoidentificacion);
      if ( tipoIdentificacion ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoIdentificacion: tipoIdentificacion,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Identificacion no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar informaci??n con el servidor.',
      };
    }
  }

  async update(idtipoidentificacion: string, updateTipoidentificacionDto: UpdateTipoIdentificacionDto) {
    try {
      const tipoIdentificacion = await this.findOne(idtipoidentificacion);
      if ( tipoIdentificacion === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Identificacion no existe.',
        };
      }
      const tipoIdentificacionPreLoad = await this.tipoIdentificacionRepository.preload( {
        idtipoidentificacion: idtipoidentificacion,
        ...updateTipoidentificacionDto,
        concurrencia: tipoIdentificacion.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( tipoIdentificacionPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Identificacion no existe.',
        };
      }
      const tipoIdentificacionUpdate = await this.tipoIdentificacionRepository.save( tipoIdentificacionPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Tipo Identificacion actualizado ??xitosamente.',
        tipoIdentificacion: tipoIdentificacion,
        tipoIdentificacionUpdate: tipoIdentificacionUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar informaci??n con el servidor.',
      };
    }
  }

  async delete(idtipoidentificacion: string) {
    try {
      let tipoIdentificacion = await this.findOne(idtipoidentificacion);
      if ( tipoIdentificacion === null ) {
        return {
          resp: 0, error: true,
          message: 'Tipo Identificacion no existe.',
        };
      }
      await this.tipoIdentificacionRepository.remove( tipoIdentificacion );
      return {
        resp: 1, error: false,
        message: 'Tipo Identificacion eliminado ??xitosamente.',
        tipoIdentificacion: tipoIdentificacion,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar informaci??n con el servidor.',
      };
    }
  }
}
