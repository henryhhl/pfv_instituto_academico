import { Injectable, Logger } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';

@Injectable()
export class MateriaService {

  private readonly logger = new Logger('MateriaService');

  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listMateria = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listMateria, totalPagination] = await this.materiaRepository.findAndCount( {
          take: limit,
          skip: offset,
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { codigo: ILike( '%' + search + '%', ), },
            { nombrecorto: ILike( '%' + search + '%', ), },
            { nombrelargo: ILike( '%' + search + '%', ), },
            { nombrealternativo: ILike( '%' + search + '%', ), },
          ],
          order: {
            created_at: "DESC",
          },
        } );
      } else {
        [listMateria, totalPagination] = await this.materiaRepository.findAndCount( {
          where: [
            { sigla: ILike( '%' + search + '%', ), },
            { codigo: ILike( '%' + search + '%', ), },
            { nombrecorto: ILike( '%' + search + '%', ), },
            { nombrelargo: ILike( '%' + search + '%', ), },
            { nombrealternativo: ILike( '%' + search + '%', ), },
          ],
          order: {
            created_at: "DESC",
          },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayMateria: listMateria,
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

  async store(createMateriaDto: CreateMateriaDto) {
    try {
      const materia = this.materiaRepository.create( {
        codigo: createMateriaDto.codigo,
        sigla: createMateriaDto.sigla,
        nombrelargo: createMateriaDto.nombrelargo,
        nombrecorto: createMateriaDto.nombrecorto,
        nombrealternativo: createMateriaDto.nombrealternativo,
        creditos: createMateriaDto.creditos,
        created_at: this.getDateTime(),
      } );
      await this.materiaRepository.save( materia );
      return {
        resp: 1, error: false,
        message: 'Materia registrado éxitosamente.',
        materia: materia,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idmateria: string) {
    try {
      const materia = await this.materiaRepository.findOneBy( {
        idmateria: idmateria,
      } );
      return materia;
    } catch (error) {
      return null;
    }
  }

  async edit( idmateria: string ) {
    try {
      const materia = await this.findOne(idmateria);
      if ( materia ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            materia: materia,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Materia no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idmateria: string ) {
    try {
      const materia = await this.findOne(idmateria);
      if ( materia ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            materia: materia,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Materia no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idmateria: string, updateMateriaDto: UpdateMateriaDto ) {
    try {
      const materia = await this.findOne(idmateria);
      if ( materia === null ) {
        return {
          resp: 0, error: false,
          message: 'Materia no existe.',
        };
      }
      const materiaPreLoad = await this.materiaRepository.preload( {
        idmateria: idmateria,
        ...updateMateriaDto,
        concurrencia: materia.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( materiaPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Materia no existe.',
        };
      }
      const materiaUpdate = await this.materiaRepository.save( materiaPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Materia actualizado éxitosamente.',
        materia: materia,
        materiaUpdate: materiaUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete( idmateria: string ) {
    try {
      let materia = await this.findOne(idmateria);
      if ( materia === null ) {
        return {
          resp: 0, error: true,
          message: 'Materia no existe.',
        };
      }
      await this.materiaRepository.remove( materia );
      return {
        resp: 1, error: false,
        message: 'Materia eliminado éxitosamente.',
        materia: materia,
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
