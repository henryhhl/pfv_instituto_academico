
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {

  private listRol: Rol[] = [];
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
            take: limit,
            skip: offset,
            where: {
            },
            order: {
                created_at: "DESC",
            },
        } );
      } else {
        [listRol, totalPagination] = await this.rolRepository.findAndCount( {
            where: {
            },
            order: {
                created_at: "DESC",
            },
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
    const rol = await this.rolRepository.findOneBy( {
      idrol: idrol,
    } );
    return rol;
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

  update(id: string, updateRolDto: UpdateRolDto) {
    let materiaDB = this.findOne(id);
    if ( materiaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Rol no existe.',
      };
    }

    // this.listRol = this.listRol.map( (rol) => {
    //   if ( rol.idrol === id ) {
    //     materiaDB.updated_at = '';
    //     materiaDB = {
    //       ...materiaDB,
    //       ...updateRolDto,
    //       idrol: id,
    //       concurrencia: rol.concurrencia + 1,
    //     };
    //     return materiaDB;
    //   }
    //   return rol;
    // } );
    return {
      resp: 1,
      error: false,
      message: 'Rol actualizado éxitosamente.',
      rol: materiaDB,
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

  fillRolSeedData( listRol: Rol[] ) {
    this.listRol = listRol;
  }

}
