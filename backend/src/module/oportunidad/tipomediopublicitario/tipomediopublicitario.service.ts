import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { TipoMedioPublicitario } from './entities/tipomediopublicitario.entity';
import { CreateTipoMedioPublicitarioDto } from './dto/create-tipomediopublicitario.dto';
import { UpdateTipoMedioPublicitarioDto } from './dto/update-tipomediopublicitario.dto';

@Injectable()
export class TipoMedioPublicitarioService {
  private readonly logger = new Logger('TipoMedioPublicitarioService');

  constructor(
    @InjectRepository(TipoMedioPublicitario)
    private readonly tipoMedioPublicitarioRepository: Repository<TipoMedioPublicitario>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listTipoMedioPublicitario = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listTipoMedioPublicitario, totalPagination] = await this.tipoMedioPublicitarioRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listTipoMedioPublicitario, totalPagination] = await this.tipoMedioPublicitarioRepository.findAndCount( {
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
        arrayTipoMedioPublicitario: listTipoMedioPublicitario,
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

  async store(createTipomediopublicitarioDto: CreateTipoMedioPublicitarioDto) {
    try {
      const existsDescripcion = await this.existsDescripcion( createTipomediopublicitarioDto.descripcion );
      if ( existsDescripcion === true ) {
        return {
          resp: 0, error: false,
          message: 'Tipo ya existente, favor ingresar uno nuevo.',
        };
      } 
      const tipoMedioPublicitario = this.tipoMedioPublicitarioRepository.create( {
        ...createTipomediopublicitarioDto,
        created_at: this.getDateTime(),
      } );
      await this.tipoMedioPublicitarioRepository.save( tipoMedioPublicitario );
      return {
        resp: 1, error: false,
        message: 'Tipo Medio Publicitario registrado éxitosamente.',
        tipoMedioPublicitario: tipoMedioPublicitario,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }


  async findOne(idtipomediopublicitario: string) {
    const tipoMedioPublicitario = await this.tipoMedioPublicitarioRepository.findOneBy( {
      idtipomediopublicitario,
    } );
    return tipoMedioPublicitario;
  }

  private async existsDescripcion(descrpcion: string) {
    const tipoMedioPublicitario = await this.tipoMedioPublicitarioRepository.findOne( {
      where: { descripcion: descrpcion, },
      order: { created_at: 'DESC', },
    } );
    return tipoMedioPublicitario ? true : false;
  }

  async edit(idtipomediopublicitario: string) {
    try {
      const tipoMedioPublicitario = await this.findOne(idtipomediopublicitario);
      if ( tipoMedioPublicitario ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoMedioPublicitario: tipoMedioPublicitario,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Medio Publicitario Curso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idtipomediopublicitario: string) {
    try {
      const tipoMedioPublicitario = await this.findOne(idtipomediopublicitario);
      if ( tipoMedioPublicitario ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          tipoMedioPublicitario: tipoMedioPublicitario,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Medio Publicitario Curso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idtipomediopublicitario: string, updateTipomediopublicitarioDto: UpdateTipoMedioPublicitarioDto) {
    try {
      const tipoMedioPublicitario = await this.findOne(idtipomediopublicitario);
      if ( tipoMedioPublicitario === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Medio Publicitario no existe.',
        };
      }
      if ( tipoMedioPublicitario.descripcion !== updateTipomediopublicitarioDto.descripcion ) {
        const existsDescripcion = await this.existsDescripcion( updateTipomediopublicitarioDto.descripcion );
        if ( existsDescripcion === true ) {
          return {
            resp: 0, error: false,
            message: 'Tipo ya existente, favor ingresar uno nuevo.',
          };
        } 
      }
      const tipoMedioPublicitarioPreLoad = await this.tipoMedioPublicitarioRepository.preload( {
        idtipomediopublicitario: idtipomediopublicitario,
        ...updateTipomediopublicitarioDto,
        concurrencia: tipoMedioPublicitario.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( tipoMedioPublicitarioPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Tipo Medio Publicitario no existe.',
        };
      }
      const tipoMedioPublicitarioUpdate = await this.tipoMedioPublicitarioRepository.save( tipoMedioPublicitarioPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Tipo Medio Publicitario actualizado éxitosamente.',
        tipoMedioPublicitario: tipoMedioPublicitarioUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idtipomediopublicitario: string) {
    try {
      let tipoMedioPublicitario = await this.findOne(idtipomediopublicitario);
      if ( tipoMedioPublicitario === null ) {
        return {
          resp: 0, error: true,
          message: 'Tipo Medio Publicitario no existe.',
        };
      }
      await this.tipoMedioPublicitarioRepository.remove( tipoMedioPublicitario );
      return {
        resp: 1, error: false,
        message: 'Tipo Medio Publicitario eliminado éxitosamente.',
        tipoMedioPublicitario: tipoMedioPublicitario,
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
