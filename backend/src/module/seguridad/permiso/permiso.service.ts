import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { Permiso } from './entities/permiso.entity';

@Injectable()
export class PermisoService {
  private readonly logger = new Logger('PermisoService');

  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  async findAll() {
    try {
      const [listPermiso, totalCount] = await this.permisoRepository.findAndCount( {
        where: {
        },
        order: { created_at: "ASC", },
      } );
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayPermiso: listPermiso,
        totalCount: totalCount,
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

  async store(createPermisoDto: CreatePermisoDto) {
    try {
      const permiso = this.permisoRepository.create( {
        fkidpermisopadre: createPermisoDto.fkidpermisopadre,
        fkidtipopermiso: createPermisoDto.fkidtipopermiso,
        tipopermiso: createPermisoDto.tipopermiso,
        descripcion: createPermisoDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.permisoRepository.save( permiso );
      return {
        resp: 1, error: false,
        message: 'Permiso registrado éxitosamente.',
        permiso: permiso,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idpermiso: string) {
    const permiso = await this.permisoRepository.findOneBy( {
      idpermiso: idpermiso,
    } );
    return permiso;
  }

  async edit(idpermiso: string) {
    try {
      const permiso = await this.findOne(idpermiso);
      if ( permiso ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          permiso: permiso,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Permiso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idpermiso: string) {
    try {
      const permiso = await this.findOne(idpermiso);
      if ( permiso ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          permiso: permiso,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Permiso no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idpermiso: string, updatePermisoDto: UpdatePermisoDto) {
    const permiso = await this.findOne(idpermiso);
    if ( permiso === null ) {
      return {
        resp: 0, error: false,
        message: 'Permiso no existe.',
      };
    }
    const permisoPreLoad = await this.permisoRepository.preload( {
      idpermiso: idpermiso,
      ...updatePermisoDto,
      concurrencia: permiso.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( permisoPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Permiso no existe.',
      };
    }
    const permisoUpdate = await this.permisoRepository.save( permisoPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Permiso actualizado éxitosamente.',
      permiso: permiso,
      permisoUpdate: permisoUpdate,
    };
  }

  async remove( idpermiso: string ) {
    try {
      let permiso = await this.findOne(idpermiso);
      if ( permiso === null ) {
        return {
          resp: 0, error: true,
          message: 'Permiso no existe.',
        };
      }
      if ( permiso.isdelete == "N" ) {
        return {
          resp: 0, error: true,
          message: "Permiso no permitido eliminar.",
        };
      }
      const arrayChildren = await this.permisoRepository.find( {
        where: {
          fkidpermisopadre: idpermiso,
        }
      } );
      if ( arrayChildren.length > 0 ) {
        return {
          resp: 0, error: true,
          message: "Funcionalidad no permitido, por que tiene sub permisos agregados.",
        };
      }
      const permisoDelete = await this.permisoRepository.remove( permiso );
      return {
        resp: 1, error: false,
        message: 'Permiso eliminado éxitosamente.',
        permiso: permiso,
        permisoDelete: permisoDelete,
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
