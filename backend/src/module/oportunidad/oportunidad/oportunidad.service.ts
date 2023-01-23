import { Repository, DataSource, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Oportunidad } from './entities/oportunidad.entity';
import { CreateOportunidadDto } from './dto/create-oportunidad.dto';
import { UpdateOportunidadDto } from './dto/update-oportunidad.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { OportunidadTipoContactoDetalle } from './entities/oportunidadtipocontactodetalle.entity';
import { OportunidadTipoMedioPublicitarioDetalle } from './entities/oportunidadtipomediopublicitariodetalle.entity';

@Injectable()
export class OportunidadService {
  private readonly logger = new Logger('OportunidadService');

  constructor(
    @InjectRepository(Oportunidad)
    private readonly oportunidadRepository: Repository<Oportunidad>,

    @InjectRepository(OportunidadTipoContactoDetalle)
    private readonly oportunidadTipoContactoRepository: Repository<OportunidadTipoContactoDetalle>,

    @InjectRepository(OportunidadTipoMedioPublicitarioDetalle)
    private readonly oportunidadTipoMedioPublicitarioRepository: Repository<OportunidadTipoMedioPublicitarioDetalle>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listOportunidad = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listOportunidad, totalPagination] = await this.oportunidadRepository.findAndCount( {
          take: limit, skip: offset * limit,
          where: [
            { identificacion: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
            { asesorresponsable: ILike( '%' + search + '%', ), },
            { ciudadorigen: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listOportunidad, totalPagination] = await this.oportunidadRepository.findAndCount( {
          where: [
            { identificacion: ILike( '%' + search + '%', ), },
            { descripcion: ILike( '%' + search + '%', ), },
            { asesorresponsable: ILike( '%' + search + '%', ), },
            { ciudadorigen: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayOportunidad: listOportunidad,
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

  async store(createOportunidadDto: CreateOportunidadDto) {
    try {
      const { arraytipocontacto, arraytipomediopublicitario, ...toCreate } = createOportunidadDto;
      const oportunidad = this.oportunidadRepository.create( {
        ...toCreate,
        arraytipocontacto: arraytipocontacto?.filter( ( item ) => ( item.fkidtipocontacto !== null ) ).map( ( item ) => {
          return this.oportunidadTipoContactoRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),
        arraytipomediopublicitario: arraytipomediopublicitario?.filter( ( item ) => ( item.fkidtipomediopublicitario !== null ) ).map( ( item ) => {
          return this.oportunidadTipoMedioPublicitarioRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } ),
        created_at: this.getDateTime(),
      } );
      await this.oportunidadRepository.save( oportunidad );
      return {
        resp: 1, error: false,
        message: 'Oportunidad registrado éxitosamente.',
        oportunidad: oportunidad,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idoportunidad: string) {
    const oportunidad = await this.oportunidadRepository.findOne( {
      where: { idoportunidad },
      relations: {
        arraynegocio: true, arraytipocontacto: true,
        arraytipomediopublicitario: true,
      },
      order: { arraynegocio: { created_at: 'ASC', arrayactividad: { created_at: 'ASC', } } },
    } );
    return oportunidad;
  }

  async edit(idoportunidad: string) {
    try {
      const oportunidad = await this.findOne(idoportunidad);
      if ( oportunidad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          oportunidad: oportunidad,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Oportunidad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idoportunidad: string) {
    try {
      const oportunidad = await this.findOne(idoportunidad);
      if ( oportunidad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          oportunidad: oportunidad,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Oportunidad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idoportunidad: string, updateOportunidadDto: UpdateOportunidadDto) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const oportunidad = await this.findOne(idoportunidad);
      if ( oportunidad === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        
        return {
          resp: 0, error: false,
          message: 'Oportunidad no existe.',
        };
      }
      const { arraytipocontacto, arraytipomediopublicitario, ...toUpdate } = updateOportunidadDto;
      const oportunidadPreLoad = await this.oportunidadRepository.preload( {
        idoportunidad: idoportunidad,
        ...toUpdate,
        concurrencia: oportunidad.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( oportunidadPreLoad === null ) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();

        return {
          resp: 0, error: false,
          message: 'Oportunidad no existe.',
        };
      }
      if ( arraytipocontacto ) {
        await queryRunner.manager.delete( OportunidadTipoContactoDetalle, { fkidoportunidad: { idoportunidad: idoportunidad } } );
        oportunidadPreLoad.arraytipocontacto = arraytipocontacto.filter( ( item ) => ( item.fkidtipocontacto !== null ) ).map( ( item ) => {
          return this.oportunidadTipoContactoRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } );
      }
      if ( arraytipomediopublicitario ) {
        await queryRunner.manager.delete( OportunidadTipoMedioPublicitarioDetalle, { fkidoportunidad: { idoportunidad: idoportunidad } } );
        oportunidadPreLoad.arraytipomediopublicitario = arraytipomediopublicitario.filter( ( item ) => ( item.fkidtipomediopublicitario !== null ) ).map( ( item ) => {
          return this.oportunidadTipoMedioPublicitarioRepository.create( {
            ...item,
            created_at: this.getDateTime(),
          } );
        } );
      }
      const oportunidadUpdate = await queryRunner.manager.save( oportunidadPreLoad );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        resp: 1,
        error: false,
        message: 'Oportunidad actualizado éxitosamente.',
        oportunidad: oportunidadUpdate,
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

  async delete(idoportunidad: string) {
    try {
      let oportunidad = await this.findOne(idoportunidad);
      if ( oportunidad === null ) {
        return {
          resp: 0, error: true,
          message: 'Oportunidad no existe.',
        };
      }
      if ( oportunidad.arraynegocio.length > 0 ) {
        return {
          resp: 0, error: true,
          message: 'Oportunidad no eliminado, ya que tiene negocios registrados.',
        };
      }
      await this.oportunidadRepository.remove( oportunidad );
      return {
        resp: 1, error: false,
        message: 'Oportunidad eliminado éxitosamente.',
        oportunidad: oportunidad,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async findAllNegocio( idoportunidad: string ) {
    try {
      let listOportunidadNegocio = [];
      let totalNegocio = 0;
        [listOportunidadNegocio, totalNegocio] = await this.oportunidadRepository.findAndCount( {
          where: [
            { idoportunidad: idoportunidad, },
          ],
          order: { created_at: "DESC", },
        } );
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayNegocio: listOportunidadNegocio,
        cantidadNegocio: totalNegocio,
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
