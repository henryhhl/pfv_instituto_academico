import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource, ILike } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { EstudianteCiudadDetalle } from './entities/estudianteciudaddetalle.entity';
import { EstudianteFamiliarDetalle } from './entities/estudiantefamiliardetalle.entity';
import { EstudianteCategoriaDocumentoDetalle } from './entities/estudiantecategoriadocumentodetalle.entity';
import { BitacoraService } from '../../seguridad/bitacora/bitacora.service';

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

    private readonly bitacoraService: BitacoraService,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listEstudiante = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listEstudiante, totalPagination] = await this.estudianteRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { nombreprincipal: ILike( '%' + search + '%', ), },
            { nombreadicional: ILike( '%' + search + '%', ), },
            { apellidoprimero: ILike( '%' + search + '%', ), },
            { apellidosegundo: ILike( '%' + search + '%', ), },
            { tipoidentificacion: ILike( '%' + search + '%', ), },
            { numeroidentificacion: ILike( '%' + search + '%', ), },
            { ciudadnacimiento: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listEstudiante, totalPagination] = await this.estudianteRepository.findAndCount( {
          where: [
            { nombreprincipal: ILike( '%' + search + '%', ), },
            { nombreadicional: ILike( '%' + search + '%', ), },
            { apellidoprimero: ILike( '%' + search + '%', ), },
            { apellidosegundo: ILike( '%' + search + '%', ), },
            { tipoidentificacion: ILike( '%' + search + '%', ), },
            { numeroidentificacion: ILike( '%' + search + '%', ), },
            { ciudadnacimiento: ILike( '%' + search + '%', ), },
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

  async store(createEstudianteDto: CreateEstudianteDto, {  usuario, ip, originalUrl }) {
    try {
      const { arraycategoriadocumento, arraynacionalidad, arrayfamiliar, ...toCreate } = createEstudianteDto;
      const estudianteCreate = this.estudianteRepository.create( {
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
      const estudianteSave = await this.estudianteRepository.save( estudianteCreate );
      let nameComplete = estudianteSave.apellidoprimero ?? '';
      if ( estudianteSave.apellidosegundo !== null ) {
        nameComplete += ` ${estudianteSave.apellidosegundo}`;
      }
      nameComplete += ` ${estudianteSave.nombreprincipal}`;
      if ( estudianteSave.nombreadicional !== null ) {
        nameComplete += ` ${estudianteSave.nombreadicional}`;
      }
      const bitacoraSave = await this.bitacoraService.store( {
        usuario: usuario,
        fkidtabla: estudianteSave.idestudiante,
        tabla: 'estudiante',
        accion: 'Registrar Estudiante',
        descripcion: `Se realizo con éxito al registrar Estudiante: ${nameComplete}`,
        event: 'store',
        ip: ip, uri: originalUrl,
        x_fecha: createEstudianteDto.x_fecha, x_hora: createEstudianteDto.x_hora,
      } );
      return {
        resp: 1, error: false,
        message: 'Estudiante registrado éxitosamente.',
        estudiante: estudianteSave,
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
    try {
      const estudiante = await this.estudianteRepository.findOne( {
        where: { idestudiante: idestudiante },
        relations: {
          arraycategoriadocumento: true, arraynacionalidad: true,
        }
      } );
      return estudiante;
    } catch (error) {
      return null;
    }
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

  async delete(idestudiante: string, { usuario, ip, originalUrl, query }) {
    try {
      let estudiante = await this.findOne(idestudiante);
      if ( estudiante === null ) {
        return {
          resp: 0, error: true,
          message: 'Estudiante no existe.',
        };
      }
      let nameComplete = estudiante.apellidoprimero ?? '';
      if ( estudiante.apellidosegundo !== null ) {
        nameComplete += ` ${estudiante.apellidosegundo}`;
      }
      nameComplete += ` ${estudiante.nombreprincipal}`;
      if ( estudiante.nombreadicional !== null ) {
        nameComplete += ` ${estudiante.nombreadicional}`;
      }
      const bitacoraSave = await this.bitacoraService.store( {
        usuario: usuario,
        fkidtabla: estudiante.idestudiante,
        tabla: 'estudiante',
        accion: 'Eliminar Estudiante',
        descripcion: `Se realizo con éxito al eliminar Estudiante: ${nameComplete}`,
        event: 'delete',
        ip: ip, uri: originalUrl,
        x_fecha: query.x_fecha, x_hora: query.x_hora,
      } );
      const estudianteDelete = await this.estudianteRepository.remove( estudiante );
      return {
        resp: 1, error: false,
        message: 'Estudiante eliminado éxitosamente.',
        estudiante: estudianteDelete,
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
