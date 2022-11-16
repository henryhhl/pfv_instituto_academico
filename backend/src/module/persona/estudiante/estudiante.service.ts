import { Repository, Like, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { EstudianteCategoriaDocumentoDetalle } from './entities/estudiantecategoriadocumentodetalle.entity';
import { EstudianteCiudadDetalle } from './entities/estudianteciudaddetalle.entity';
import { EstudianteFamiliarDetalle } from './entities/estudiantefamiliardetalle.entity';

@Injectable()
export class EstudianteService {
  private readonly logger = new Logger('EstudianteService');

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(EstudianteCategoriaDocumentoDetalle)
    private readonly estudianteCategoriaDocumentoDetalleRepository: Repository<EstudianteCategoriaDocumentoDetalle>,

    @InjectRepository(EstudianteCiudadDetalle)
    private readonly estudianteCiudadDetalleRepository: Repository<EstudianteCiudadDetalle>,

    @InjectRepository(EstudianteFamiliarDetalle)
    private readonly estudianteFamiliarDetalleRepository: Repository<EstudianteFamiliarDetalle>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listEstudiante = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listEstudiante, totalPagination] = await this.estudianteRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { nombreprincipal: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listEstudiante, totalPagination] = await this.estudianteRepository.findAndCount( {
          where: [
            { nombreprincipal: Like( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayEstudiante: listEstudiante,
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
    milliSeconds = (+milliSeconds < 10) ? "00" + milliSeconds : ( +milliSeconds < 100 ) ? "0" + milliSeconds : milliSeconds ;

    return `${year}-${month}-${day} ${hour}:${minutes}:${segundos}:${milliSeconds}`;
  }

  private generateRegistro() {
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
    milliSeconds = (+milliSeconds < 10) ? "00" + milliSeconds : ( +milliSeconds < 100 ) ? "0" + milliSeconds : milliSeconds;

    return `${year}${month}${milliSeconds}${minutes}${hour}${segundos}${day}`;
  }

  async store(createEstudianteDto: CreateEstudianteDto) {
    try {
      const { arraycategoriadocumento, arraynacionalidad, arrayfamiliar, ...toCreate } = createEstudianteDto;
      const estudiante = this.estudianteRepository.create( {
        ...toCreate,
        numeroregistro: this.generateRegistro(),
        arraycategoriadocumento: arraycategoriadocumento?.filter( 
          ( item ) => ( item.fkidcategoriadocumento !== null ) 
        ).map( ( item ) => {
          return this.estudianteCategoriaDocumentoDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),
        arraynacionalidad: arraynacionalidad?.filter( 
          ( item ) => ( item.fkidnacionalidad !== null ) ).map( ( item ) => {
          return this.estudianteCiudadDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),
        arrayfamiliar: arrayfamiliar?.filter( 
          ( item ) => ( item.nombreprincipal !== null && item.nombreprincipal.trim().length > 0 ) ).map( ( item ) => {
          return this.estudianteFamiliarDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),
        created_at: this.getDateTime(),
      } );
      await this.estudianteRepository.save( estudiante );
      return {
        resp: 1, error: false,
        message: 'Estudiante registrado éxitosamente.',
        estudiante: estudiante,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idestudiante: string) {
    const estudiante = await this.estudianteRepository.findOne( {
      where: { idestudiante: idestudiante },
      relations: {
        arraycategoriadocumento: true, arraynacionalidad: true,
      }
    } );
    return estudiante;
  }

  async edit(idestudiante: string) {
    try {
      const estudiante = await this.findOne(idestudiante);
      if ( estudiante ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          estudiante: estudiante,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Estudiante no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idestudiante: string) {
    try {
      const estudiante = await this.findOne(idestudiante);
      if ( estudiante ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          estudiante: estudiante,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Estudiante no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idestudiante: string, updateEstudianteDto: UpdateEstudianteDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const estudiante = await this.findOne(idestudiante);
      if ( estudiante === null ) {
        return {
          resp: 0, error: false,
          message: 'Estudiante no existe.',
        };
      }
      const { arraycategoriadocumento, arraynacionalidad, arrayfamiliar, ...toUpdate } = updateEstudianteDto;
      const estudiantePreLoad = await this.estudianteRepository.preload( {
        idestudiante: idestudiante,
        ...toUpdate,
        concurrencia: estudiante.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( estudiantePreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Estudiante no existe.',
        };
      }
      if ( arraynacionalidad ) {
        await queryRunner.manager.delete( EstudianteCiudadDetalle, { fkidestudiante: { idestudiante: idestudiante } } );
        estudiantePreLoad.arraynacionalidad = arraynacionalidad.filter( 
          ( item ) => ( item.fkidnacionalidad !== null ) 
        ).map( ( item ) => {
          return this.estudianteCiudadDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } );
      }
      if ( arraycategoriadocumento ) {
        await queryRunner.manager.delete( EstudianteCategoriaDocumentoDetalle, { fkidestudiante: { idestudiante: idestudiante } } );
        estudiantePreLoad.arraycategoriadocumento = arraycategoriadocumento.filter( 
            ( item ) => ( item.fkidcategoriadocumento !== null ) 
        ).map( ( item ) => {
          return this.estudianteCategoriaDocumentoDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } );
      }
      if ( arrayfamiliar ) {
        await queryRunner.manager.delete( EstudianteFamiliarDetalle, { fkidestudiante: { idestudiante: idestudiante } } );
        estudiantePreLoad.arrayfamiliar = arrayfamiliar.filter( 
            ( item ) => ( item.nombreprincipal !== null && item.nombreprincipal.trim().length > 0 ) 
        ).map( ( item ) => {
          return this.estudianteFamiliarDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } );
      }
      const estudianteUpdate = await queryRunner.manager.save( estudiantePreLoad );
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        resp: 1,
        error: false,
        message: 'Estudiante actualizado éxitosamente.',
        estudiante: estudiante,
        estudianteUpdate: estudianteUpdate,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idestudiante: string) {
    try {
      let estudiante = await this.findOne(idestudiante);
      if ( estudiante === null ) {
        return {
          resp: 0, error: true,
          message: 'Estudiante no existe.',
        };
      }
      await this.estudianteRepository.remove( estudiante );
      return {
        resp: 1, error: false,
        message: 'Estudiante eliminado éxitosamente.',
        estudiante: estudiante,
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
