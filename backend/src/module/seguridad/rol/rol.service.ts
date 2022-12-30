
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Rol } from './entities/rol.entity';
import { UpdateRolDto } from './dto/update-rol.dto';
import { CreateRolDto } from './dto/create-rol.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class RolService {
  private readonly logger = new Logger('RolService');

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listRol = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listRol, totalPagination] = await this.rolRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
            { tiporol: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listRol, totalPagination] = await this.rolRepository.findAndCount( {
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
            { tiporol: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayRol: listRol,
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

  async store(createRolDto: CreateRolDto) {
    try {
      const rol = this.rolRepository.create( {
        fkidtiporol: createRolDto.fkidtiporol,
        tiporol: createRolDto.tiporol,
        descripcion: createRolDto.descripcion,
        nota: createRolDto.nota,
        created_at: this.getDateTime(),
      } );
      await this.rolRepository.save( rol );
      return {
        resp: 1, error: false,
        message: 'Rol registrado éxitosamente.',
        rol: rol,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idrol: string) {
    try {
      const rol = await this.rolRepository.findOneBy( {
        idrol: idrol,
      } );
      return rol;
    } catch (error) {
      return null;
    }
  }

  async edit( idrol: string ) {
    try {
      const rol = await this.findOne(idrol);
      if ( rol ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          rol: rol,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Rol no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show( idrol: string ) {
    try {
      const rol = await this.findOne(idrol);
      if ( rol ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          rol: rol,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Rol no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idrol: string, updateRolDto: UpdateRolDto ) {
    const rol = await this.findOne(idrol);
    if ( rol === null ) {
      return {
        resp: 0, error: false,
        message: 'Rol no existe.',
      };
    }
    const rolPreLoad = await this.rolRepository.preload( {
      idrol: idrol,
      ...updateRolDto,
      concurrencia: rol.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( rolPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Rol no existe.',
      };
    }
    const rolUpdate = await this.rolRepository.save( rolPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Rol actualizado éxitosamente.',
      rol: rol,
      rolUpdate: rolUpdate,
    };
  }

  async delete( idrol: string ) {
    try {
      let rol = await this.findOne(idrol);
      if ( rol === null ) {
        return {
          resp: 0, error: true,
          message: 'Rol no existe.',
        };
      }
      await this.rolRepository.remove( rol );
      return {
        resp: 1, error: false,
        message: 'Rol eliminado éxitosamente.',
        rol: rol,
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
