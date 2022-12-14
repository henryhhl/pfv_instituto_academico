
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateTipoMateriaDto } from './dto/create-tipomateria.dto';
import { UpdateTipoMateriaDto } from './dto/update-tipomateria.dto';
import { TipoMateria } from './entities/tipomateria.entity';

@Injectable()
export class TipoMateriaService {
  private readonly logger = new Logger('TipoMateriaService');

  constructor(
    @InjectRepository(TipoMateria)
    private readonly tipoMateriaRepository: Repository<TipoMateria>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listTipoMateria = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listTipoMateria, totalPagination] = await this.tipoMateriaRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listTipoMateria, totalPagination] = await this.tipoMateriaRepository.findAndCount( {
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
        arrayTipoMateria: listTipoMateria,
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

  async store(createTipoMateriaDto: CreateTipoMateriaDto) {
    try {
      const tipoMateria = this.tipoMateriaRepository.create( {
        sigla: createTipoMateriaDto.sigla,
        descripcion: createTipoMateriaDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.tipoMateriaRepository.save( tipoMateria );
      return {
        resp: 1, error: false,
        message: 'Tipo Materia registrado éxitosamente.',
        tipoMateria: tipoMateria,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idtipomateria: string) {
    const tipoMateria = await this.tipoMateriaRepository.findOneBy( {
      idtipomateria: idtipomateria,
    } );
    return tipoMateria;
  }

  async edit( idtipomateria: string ) {
    try {
      const tipoMateria = await this.findOne(idtipomateria);
      if ( tipoMateria ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            tipoMateria: tipoMateria,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Materia no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idtipomateria: string ) {
    try {
      const tipoMateria = await this.findOne(idtipomateria);
      if ( tipoMateria ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            tipoMateria: tipoMateria,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Tipo Materia no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idtipomateria: string, updateTipoMateriaDto: UpdateTipoMateriaDto ) {
    const tipoMateria = await this.findOne(idtipomateria);
    if ( tipoMateria === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo Materia no existe.',
      };
    }
    const tipoMateriaPreLoad = await this.tipoMateriaRepository.preload( {
      idtipomateria: idtipomateria,
      ...updateTipoMateriaDto,
      concurrencia: tipoMateria.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( tipoMateriaPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Tipo Materia no existe.',
      };
    }
    const tipoMateriaUpdate = await this.tipoMateriaRepository.save( tipoMateriaPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Tipo Materia actualizado éxitosamente.',
      tipoMateria: tipoMateria,
      tipoMateriaUpdate: tipoMateriaUpdate,
    };
  }

  async delete(idtipomateria: string) {
    try {
      let tipoMateria = await this.findOne(idtipomateria);
      if ( tipoMateria === null ) {
        return {
          resp: 0, error: true,
          message: 'Tipo Materia no existe.',
        };
      }
      await this.tipoMateriaRepository.remove( tipoMateria );
      return {
        resp: 1, error: false,
        message: 'Tipo Materia eliminado éxitosamente.',
        tipoMateria: tipoMateria,
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
