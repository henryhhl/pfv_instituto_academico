import { Injectable, Logger } from '@nestjs/common';
import { CreateMotivoAperturaCierreCursoDto } from './dto/create-motivoaperturacierrecurso.dto';
import { UpdateMotivoAperturaCierreCursoDto } from './dto/update-motivoaperturacierrecurso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MotivoAperturaCierreCurso } from './entities/motivoaperturacierrecurso.entity';
import { Repository, Like } from 'typeorm';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class MotivoAperturaCierreCursoService {
  private readonly logger = new Logger('MotivoAperturaCierreCursoService');

  constructor(
    @InjectRepository(MotivoAperturaCierreCurso)
    private readonly motivoAperturaCierreCursoRepository: Repository<MotivoAperturaCierreCurso>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listMotivoAperturaCierreCurso = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listMotivoAperturaCierreCurso, totalPagination] = await this.motivoAperturaCierreCursoRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listMotivoAperturaCierreCurso, totalPagination] = await this.motivoAperturaCierreCursoRepository.findAndCount( {
          where: [
            { descripcion: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayMotivoAperturaCierreCurso: listMotivoAperturaCierreCurso,
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

  async store(createMotivoAperturaCierreCursoDto: CreateMotivoAperturaCierreCursoDto) {
    try {
      const motivoAperturaCierreCurso = this.motivoAperturaCierreCursoRepository.create( {
        ...createMotivoAperturaCierreCursoDto,
        created_at: this.getDateTime(),
      } );
      await this.motivoAperturaCierreCursoRepository.save( motivoAperturaCierreCurso );
      return {
        resp: 1, error: false,
        message: 'Motivo Apertura Cierre Curso registrado éxitosamente.',
        motivoAperturaCierreCurso: motivoAperturaCierreCurso,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idmotivoaperturacierrecurso: string) {
    const motivoAperturaCierreCurso = await this.motivoAperturaCierreCursoRepository.findOneBy( {
      idmotivoaperturacierrecurso,
    } );
    return motivoAperturaCierreCurso;
  }

  async edit(idmotivoaperturacierrecurso: string) {
    try {
      const motivoAperturaCierreCurso = await this.findOne(idmotivoaperturacierrecurso);
      if ( motivoAperturaCierreCurso ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          motivoAperturaCierreCurso: motivoAperturaCierreCurso,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Motivo Apertura Cierre Curso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idmotivoaperturacierrecurso: string) {
    try {
      const motivoAperturaCierreCurso = await this.findOne(idmotivoaperturacierrecurso);
      if ( motivoAperturaCierreCurso ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          motivoAperturaCierreCurso: motivoAperturaCierreCurso,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Motivo Apertura Cierre Curso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idmotivoaperturacierrecurso: string, updateMotivoaperturacierrecursoDto: UpdateMotivoAperturaCierreCursoDto) {
    try {
      const motivoAperturaCierreCurso = await this.findOne(idmotivoaperturacierrecurso);
      if ( motivoAperturaCierreCurso === null ) {
        return {
          resp: 0, error: false,
          message: 'Motivo Apertura Cierre Curso no existe.',
        };
      }
      const motivoAperturaCierreCursoPreLoad = await this.motivoAperturaCierreCursoRepository.preload( {
        idmotivoaperturacierrecurso: idmotivoaperturacierrecurso,
        ...updateMotivoaperturacierrecursoDto,
        concurrencia: motivoAperturaCierreCurso.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( motivoAperturaCierreCursoPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Motivo Apertura Cierre Curso no existe.',
        };
      }
      const motivoAperturaCierreCursoUpdate = await this.motivoAperturaCierreCursoRepository.save( motivoAperturaCierreCursoPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Motivo Apertura Cierre Curso actualizado éxitosamente.',
        motivoAperturaCierreCurso: motivoAperturaCierreCursoUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idmotivoaperturacierrecurso: string) {
    try {
      let motivoAperturaCierreCurso = await this.findOne(idmotivoaperturacierrecurso);
      if ( motivoAperturaCierreCurso === null ) {
        return {
          resp: 0, error: true,
          message: 'Motivo Apertura Cierre Curso no existe.',
        };
      }
      await this.motivoAperturaCierreCursoRepository.remove( motivoAperturaCierreCurso );
      return {
        resp: 1, error: false,
        message: 'Motivo Apertura Cierre Curso eliminado éxitosamente.',
        motivoAperturaCierreCurso: motivoAperturaCierreCurso,
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
