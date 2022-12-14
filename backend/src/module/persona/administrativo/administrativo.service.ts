import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource, ILike } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Administrativo } from './entities/administrativo.entity';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';
import { AdministrativoEstudioDetalle } from './entities/administrativoestudiodetalle.entity';
import { AdministrativoNacionalidadDetalle } from './entities/administrativociudaddetalle.entity';
import { AdministrativoReferenciaContactoDetalle } from './entities/administrativoreferenciacontacto.entity';
import { AdministrativoCategoriaDocumentoDetalle } from './entities/administrativocategoriadocumentodetalle.entity';

@Injectable()
export class AdministrativoService {
  private readonly logger = new Logger('AdministrativoService');

  constructor(
    @InjectRepository(Administrativo)
    private readonly administrativoRepository: Repository<Administrativo>,

    @InjectRepository(AdministrativoNacionalidadDetalle)
    private readonly administrativoNacionalidadDetalleRepository: Repository<AdministrativoNacionalidadDetalle>,

    @InjectRepository(AdministrativoReferenciaContactoDetalle)
    private readonly administrativoReferenciaContactoDetalleRepository: Repository<AdministrativoReferenciaContactoDetalle>,

    @InjectRepository(AdministrativoCategoriaDocumentoDetalle)
    private readonly administrativoCategoriaDocumentoDetalleRepository: Repository<AdministrativoCategoriaDocumentoDetalle>,

    @InjectRepository(AdministrativoEstudioDetalle)
    private readonly administrativoEstudioDetalleRepository: Repository<AdministrativoEstudioDetalle>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listAdministrativo = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listAdministrativo, totalPagination] = await this.administrativoRepository.findAndCount( {
          take: limit, skip: offset,
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
        [listAdministrativo, totalPagination] = await this.administrativoRepository.findAndCount( {
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
        arrayAdministrativo: listAdministrativo,
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

  async store(createAdministrativoDto: CreateAdministrativoDto) {
    try {
      const administrativo = this.administrativoRepository.create( {
        ...createAdministrativoDto,

        arraynacionalidad: createAdministrativoDto.arraynacionalidad?.filter( ( ciudad ) => ( ciudad.fkidnacionalidad !== null ) ).map( ( ciudad ) => {
          return this.administrativoNacionalidadDetalleRepository.create( {
            fkidnacionalidad: ciudad.fkidnacionalidad,
            nacionalidad: ciudad.nacionalidad,
            created_at: this.getDateTime(),
          } );
        } ),

        arraycategoriadocumento: createAdministrativoDto.arraycategoriadocumento?.filter( ( item ) => ( item.fkidcategoriadocumento !== null ) ).map( ( item ) => {
          return this.administrativoCategoriaDocumentoDetalleRepository.create( {
            fkidcategoriadocumento: item.fkidcategoriadocumento,
            categoriadocumento: item.categoriadocumento,
            descripcion: item.descripcion,
            documento: item.documento,
            extension: item.extension,
            estado: ( item.estado !== 'A' && item.estado !== 'N' ) ? 'A' : item.estado,
            created_at: this.getDateTime(),
          } );
        } ),

        arrayestudio: createAdministrativoDto.arrayestudio?.filter( 
          ( item ) => ( item.fkidinstitucion !== null && item.fkidnivelacademico !== null ) 
        ).map( ( item ) => {
          return this.administrativoEstudioDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),

        arrayreferenciacontactos: [],
        created_at: this.getDateTime(),
      } );
      await this.administrativoRepository.save( administrativo );
      return {
        resp: 1, error: false,
        message: 'Administrativo registrado éxitosamente.',
        administrativo: administrativo,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idadministrativo: string) {
    const administrativo = await this.administrativoRepository.findOne( {
      where: { idadministrativo: idadministrativo },
      relations: { 
        arraynacionalidad: true, arraycategoriadocumento: true, 
        arrayestudio: true,
      },
    } );
    return administrativo;
  }

  async edit(idadministrativo: string) {
    try {
      const administrativo = await this.findOne(idadministrativo);
      if ( administrativo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          administrativo: administrativo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Administrativo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idadministrativo: string) {
    try {
      const administrativo = await this.findOne(idadministrativo);
      if ( administrativo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          administrativo: administrativo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Administrativo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idadministrativo: string, updateAdministrativoDto: UpdateAdministrativoDto) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const administrativo = await this.findOne(idadministrativo);
      if ( administrativo === null ) {
        return {
          resp: 0, error: false,
          message: 'Administrativo no existe.',
        };
      }
      const { arraycategoriadocumento, arrayestudio, arraynacionalidad, ...toUpdate } = updateAdministrativoDto;
      const administrativoPreLoad = await this.administrativoRepository.preload( {
        idadministrativo: idadministrativo,
        ...toUpdate,
        concurrencia: administrativo.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( administrativoPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Administrativo no existe.',
        };
      }

      if ( arraynacionalidad ) {
        await queryRunner.manager.delete( AdministrativoNacionalidadDetalle, { fkidadministrativo: { idadministrativo: idadministrativo } } );
        administrativoPreLoad.arraynacionalidad = arraynacionalidad.filter( ( ciudad ) => ( ciudad.fkidnacionalidad !== null ) ).map( ( ciudad ) => {
          return this.administrativoNacionalidadDetalleRepository.create( {
            fkidnacionalidad: ciudad.fkidnacionalidad,
            nacionalidad: ciudad.nacionalidad,
            created_at: this.getDateTime(),
          } );
        } );
      }

      if ( arraycategoriadocumento ) {
        await queryRunner.manager.delete( AdministrativoCategoriaDocumentoDetalle, { fkidadministrativo: { idadministrativo: idadministrativo } } );
        administrativoPreLoad.arraycategoriadocumento = arraycategoriadocumento
        .filter( ( item ) => ( item.fkidcategoriadocumento !== null ) ).map( ( item ) => {
          return this.administrativoCategoriaDocumentoDetalleRepository.create( {
            fkidcategoriadocumento: item.fkidcategoriadocumento,
            categoriadocumento: item.categoriadocumento,
            descripcion: item.descripcion,
            documento: item.documento,
            extension: item.extension,
            estado: ( item.estado !== 'A' && item.estado !== 'N' ) ? 'A' : item.estado,
            created_at: this.getDateTime(),
          } );
        } );
      }

      if ( arrayestudio ) {
        await queryRunner.manager.delete( AdministrativoEstudioDetalle, { fkidadministrativo: { idadministrativo: idadministrativo } } );
        administrativoPreLoad.arrayestudio = arrayestudio.filter( 
            ( item ) => ( item.fkidinstitucion !== null && item.fkidnivelacademico !== null ) 
        ).map( ( item ) => {
          return this.administrativoEstudioDetalleRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } );
      }

      const administrativoUpdate = await queryRunner.manager.save( administrativoPreLoad );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        resp: 1,
        error: false,
        message: 'Administrativo actualizado éxitosamente.',
        administrativo: administrativo,
        administrativoUpdate: administrativoUpdate,
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

  async delete(idadministrativo: string) {
    try {
      let administrativo = await this.findOne(idadministrativo);
      if ( administrativo === null ) {
        return {
          resp: 0, error: true,
          message: 'Administrativo no existe.',
        };
      }
      await this.administrativoRepository.remove( administrativo );
      return {
        resp: 1, error: false,
        message: 'Administrativo eliminado éxitosamente.',
        administrativo: administrativo,
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
