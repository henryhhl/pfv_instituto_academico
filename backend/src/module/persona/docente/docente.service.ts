import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource, ILike } from 'typeorm';
import { Docente } from './entities/docente.entity';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { BitacoraService } from '../../seguridad/bitacora/bitacora.service';
import { DocenteCiudadDetalle } from './entities/docenteciudaddetalle.entity';
import { DocenteEstudioDetalle } from './entities/docenteestudiodetalle.entity';
import { DocenteMateriaDetalle } from './entities/docentemateriadetalle.entity';
import { DocenteReferenciaContactoDetalle } from './entities/docentereferenciacontacto.entity';
import { DocenteCategoriaDocumentoDetalle } from './entities/docentecategoriadocumentodetalle.entity';

@Injectable()
export class DocenteService {
  private readonly logger = new Logger('DocenteService');

  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,

    @InjectRepository(DocenteCiudadDetalle)
    private readonly docenteCiudadDetalleRepository: Repository<DocenteCiudadDetalle>,

    @InjectRepository(DocenteMateriaDetalle)
    private readonly docenteMateriaDetalleRepository: Repository<DocenteMateriaDetalle>,

    @InjectRepository(DocenteCategoriaDocumentoDetalle)
    private readonly docenteCategoriaDocumentoDetalleRepository: Repository<DocenteCategoriaDocumentoDetalle>,

    @InjectRepository(DocenteEstudioDetalle)
    private readonly docenteEstudioDetalleRepository: Repository<DocenteEstudioDetalle>,

    @InjectRepository(DocenteReferenciaContactoDetalle)
    private readonly docenteReferenciaContactoDetalleRepository: Repository<DocenteReferenciaContactoDetalle>,

    private readonly dataSource: DataSource,

    private readonly bitacoraService: BitacoraService,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listDocente = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listDocente, totalPagination] = await this.docenteRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { nombreadicional: ILike( '%' + search + '%', ), },
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
        [listDocente, totalPagination] = await this.docenteRepository.findAndCount( {
          where: [
            { nombreadicional: ILike( '%' + search + '%', ), },
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
        arrayDocente: listDocente,
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

  async store(createDocenteDto: CreateDocenteDto, { usuario, ip, originalUrl }) {
    try {
      const docenteCreate = this.docenteRepository.create( {
        ...createDocenteDto,

        arraynacionalidad: createDocenteDto.arraynacionalidad?.filter( ( ciudad ) => ( ciudad.fkidnacionalidad !== null ) 
        ).map( ( ciudad ) => {
          return this.docenteCiudadDetalleRepository.create( {
            fkidnacionalidad: ciudad.fkidnacionalidad,
            nacionalidad: ciudad.nacionalidad,
            created_at: this.getDateTime(),
          } );
        } ),

        arraymateria: createDocenteDto.arraymateria?.filter( ( materia ) => ( materia.fkidmateria !== null ) ).map( ( materia ) => {
          return this.docenteMateriaDetalleRepository.create( {
            fkidmateria: materia.fkidmateria,
            materia: materia.materia,
            estado: (materia.estado !== 'A' && materia.estado !== 'N' ) ? 'A' : materia.estado,
            tipoprioridad: (materia.tipoprioridad !== '' ) ? 'A' : materia.tipoprioridad,
            created_at: this.getDateTime(),
          } );
        } ),

        arraycategoriadocumento: createDocenteDto.arraycategoriadocumento?.filter( 
          ( item ) => ( item.fkidcategoriadocumento !== null ) 
        ).map( ( item ) => {
          return this.docenteCategoriaDocumentoDetalleRepository.create( {
            fkidcategoriadocumento: item.fkidcategoriadocumento,
            categoriadocumento: item.categoriadocumento,
            descripcion: item.descripcion,
            documento: item.documento,
            extension: item.extension,
            estado: item.estado,
            created_at: this.getDateTime(),
          } );
        } ),

        arrayestudio: createDocenteDto.arrayestudio?.filter( 
          ( item ) => ( item.fkidinstitucion !== null && item.fkidnivelacademico !== null ) 
        ).map( ( item ) => {
          return this.docenteEstudioDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),

        arrayreferenciacontactos: [],
        created_at: this.getDateTime(),
      } );

      const docenteSave = await this.docenteRepository.save( docenteCreate );

      let nameComplete = docenteSave.apellidoprimero ?? '';
      if ( docenteSave.apellidosegundo !== null ) {
        nameComplete += ` ${docenteSave.apellidosegundo}`;
      }
      nameComplete += ` ${docenteSave.nombreprincipal}`;
      if ( docenteSave.nombreadicional !== null ) {
        nameComplete += ` ${docenteSave.nombreadicional}`;
      }

      const bitacoraSave = await this.bitacoraService.store( {
        usuario: usuario,
        fkidtabla: docenteSave.iddocente,
        tabla: 'docente',
        accion: 'Registrar Docente',
        descripcion: `Se realizo con éxito al registrar Docente: ${nameComplete}`,
        event: 'store',
        ip: ip, uri: originalUrl,
        x_fecha: createDocenteDto.x_fecha, x_hora: createDocenteDto.x_hora,
      } );

      return {
        resp: 1, error: false,
        message: 'Docente registrado éxitosamente.',
        docente: docenteSave,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(iddocente: string) {
    try {
      const docente = await this.docenteRepository.findOne( {
        where: { iddocente: iddocente },
        relations: { 
          arraynacionalidad: true, arraymateria: true, 
          arraycategoriadocumento: true, arrayestudio: true,
        },
      } );
      return docente;
    } catch (error) {
      return null;
    }
  }

  async edit(iddocente: string) {
    try {
      const docente = await this.findOne(iddocente);
      if ( docente ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          docente: docente,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Docente no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(iddocente: string) {
    try {
      const docente = await this.findOne(iddocente);
      if ( docente ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          docente: docente,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Docente no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(iddocente: string, updateDocenteDto: UpdateDocenteDto) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const docente = await this.findOne(iddocente);
      if ( docente === null ) {
        return {
          resp: 0, error: false,
          message: 'Docente no existe.',
        };
      }
      const { arraynacionalidad, arraymateria, arraycategoriadocumento, arrayestudio, ...toUpdate } = updateDocenteDto;
      const docentePreLoad = await this.docenteRepository.preload( {
        iddocente: iddocente,
        ...toUpdate,
        concurrencia: docente.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( docentePreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Docente no existe.',
        };
      }

      if ( arraynacionalidad ) {
        await queryRunner.manager.delete( DocenteCiudadDetalle, { fkiddocente: { iddocente: iddocente } } );
        docentePreLoad.arraynacionalidad = arraynacionalidad.filter( ( ciudad ) => ( ciudad.fkidnacionalidad !== null ) ).map( ( ciudad ) => {
          return this.docenteCiudadDetalleRepository.create( {
            fkidnacionalidad: ciudad.fkidnacionalidad,
            nacionalidad: ciudad.nacionalidad,
            created_at: this.getDateTime(),
          } );
        } );
      }

      if ( arraymateria ) {
        await queryRunner.manager.delete( DocenteMateriaDetalle, { fkiddocente: { iddocente: iddocente } } );
        docentePreLoad.arraymateria = arraymateria.filter( ( materia ) => ( materia.fkidmateria !== null ) ).map( ( materia ) => {
          return this.docenteMateriaDetalleRepository.create( {
            fkidmateria: materia.fkidmateria,
            materia: materia.materia,
            estado: (materia.estado !== 'A' && materia.estado !== 'N' ) ? 'A' : materia.estado,
            tipoprioridad: (materia.tipoprioridad !== '' ) ? 'A' : materia.tipoprioridad,
            created_at: this.getDateTime(),
          } );
        } );
      }

      if ( arraycategoriadocumento ) {
        await queryRunner.manager.delete( DocenteCategoriaDocumentoDetalle, { fkiddocente: { iddocente: iddocente } } );
        docentePreLoad.arraycategoriadocumento = arraycategoriadocumento.filter( 
            ( categoriadocumento ) => ( categoriadocumento.fkidcategoriadocumento !== null ) 
        ).map( ( categoriadocumento ) => {
          return this.docenteCategoriaDocumentoDetalleRepository.create( {
            fkidcategoriadocumento: categoriadocumento.fkidcategoriadocumento,
            categoriadocumento: categoriadocumento.categoriadocumento,
            descripcion: categoriadocumento.descripcion,
            documento: categoriadocumento.documento,
            extension: categoriadocumento.extension,
            estado: categoriadocumento.estado,
            created_at: this.getDateTime(),
          } );
        } );
      }

      if ( arrayestudio ) {
        await queryRunner.manager.delete( DocenteEstudioDetalle, { fkiddocente: { iddocente: iddocente } } );
        docentePreLoad.arrayestudio = arrayestudio.filter( 
            ( item ) => ( item.fkidinstitucion !== null && item.fkidnivelacademico !== null ) 
        ).map( ( item ) => {
          return this.docenteEstudioDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } );
      }

      const docenteUpdate = await queryRunner.manager.save( docentePreLoad );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        resp: 1,
        error: false,
        message: 'Docente actualizado éxitosamente.',
        docente: docente,
        docenteUpdate: docenteUpdate,
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

  async delete(iddocente: string, { usuario, ip, originalUrl, query }) {
    try {
      let docente = await this.findOne(iddocente);
      if ( docente === null ) {
        return {
          resp: 0, error: true,
          message: 'Docente no existe.',
        };
      }
      let nameComplete = docente.apellidoprimero ?? '';
      if ( docente.apellidosegundo !== null ) {
        nameComplete += ` ${docente.apellidosegundo}`;
      }
      nameComplete += ` ${docente.nombreprincipal}`;
      if ( docente.nombreadicional !== null ) {
        nameComplete += ` ${docente.nombreadicional}`;
      }

      const bitacoraSave = await this.bitacoraService.store( {
        usuario: usuario,
        fkidtabla: docente.iddocente,
        tabla: 'docente',
        accion: 'Eliminar Docente',
        descripcion: `Se realizo con éxito al eliminar Docente: ${nameComplete}`,
        event: 'delete',
        ip: ip, uri: originalUrl,
        x_fecha: query.x_fecha, x_hora: query.x_hora,
      } );

      const docenteDelete = await this.docenteRepository.remove( docente );
      return {
        resp: 1, error: false,
        message: 'Docente eliminado éxitosamente.',
        docente: docenteDelete,
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
