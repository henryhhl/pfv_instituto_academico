import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { AsignarRol } from './entities/asignarrol.entity';
import { CreateAsignarRolDto } from './dto/create-asignarrol.dto';
import { UpdateAsignarRolDto } from './dto/update-asignarrol.dto';
import { RolService } from '../rol/rol.service';
import { UsuarioService } from '../usuario/usuario.service';
import { AsignarRolPaginationDto } from './dto/pagination.dto';

@Injectable()
export class AsignarRolService {
  private readonly logger = new Logger('AsignarRolService');

  constructor(
    @InjectRepository(AsignarRol)
    private readonly asignarRolRepository: Repository<AsignarRol>,

    private readonly usuarioService: UsuarioService,
    private readonly rolService: RolService,
  ) {}

  async findAll(paginationDto: AsignarRolPaginationDto) {
    try {
      let listRol = [];
      let totalPagination = 0;

      const usuarioFirst = await this.usuarioService.findOne(paginationDto.fkidusuario);
      
      if ( usuarioFirst !== null ) {
        [listRol, totalPagination] = await this.asignarRolRepository.findAndCount( {
          select: {
            idasignarrol: true,
            rol: {
              idrol: true,
              descripcion: true,
              nota: true,
              estado: true,
            },
            estado: true,
            created_at: true,
          },
          where: {
            usuario: {
              idusuario: usuarioFirst.idusuario,
            },
          },
          relations: {
            rol: true,
          },
          order: { created_at: "DESC", },
        } );
      }

      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayGrupo: listRol,
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

  async asignar(createAsignarrolDto: CreateAsignarRolDto) {
    try {

      const usuarioFirst = await this.usuarioService.findOne( createAsignarrolDto.fkidusuario );
      if ( usuarioFirst === null ) {
        return {
          resp: 0, error: false,
          message: 'Usuario no existente.',
        };
      }

      const rolFirst = await this.rolService.findOne( createAsignarrolDto.fkidrol );
      if ( rolFirst === null ) {
        return {
          resp: 0, error: false,
          message: 'Rol no existente.',
        };
      }

      const asignarRolCreate = this.asignarRolRepository.create( {
        usuario: usuarioFirst,
        rol: rolFirst,
        estado: 'A',
        created_at: this.getDateTime(),
      } );
      await this.asignarRolRepository.save( asignarRolCreate );

      return await this.findAll( { fkidusuario: asignarRolCreate.usuario.idusuario } );

    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idasignarrol: string) {
    try {
      const rol = await this.asignarRolRepository.findOne( {
        relations: {
          rol: true,
          usuario: true,
        },
        select: {
          idasignarrol: true,
          estado: true,
          rol: {
            idrol: true,
            descripcion: true,
            nota: true,
            estado: true,
          },
          usuario: {
            idusuario: true,
            nombreprincipal: true,
            login: true,
            email: true,
            estado: true,
          },
        },
        where: {
          idasignarrol: idasignarrol,
        },
      } );
      return rol;
    } catch (error) {
      return null;
    }
  }

  async update(idasignarrol: string, updateAsignarrolDto: UpdateAsignarRolDto) {
    const asignarRolFirst = await this.findOne(idasignarrol);
    if ( asignarRolFirst === null ) {
      return {
        resp: 0, error: false,
        message: 'Rol no existe.',
      };
    }
    const asignarRolPreLoad = await this.asignarRolRepository.preload( {
      idasignarrol: idasignarrol,
      estado: updateAsignarrolDto.estado ?? 'N',
      concurrencia: asignarRolFirst.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( asignarRolPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Rol no existe.',
      };
    }
    await this.asignarRolRepository.save( asignarRolPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Servicio actualizado éxitosamente.',
    };
  }

  async delete(idasignarrol: string) {
    try {
      let rolFirst = await this.findOne(idasignarrol);
      if ( rolFirst === null ) {
        return {
          resp: 0, error: true,
          message: 'Rol no existente.',
        };
      }
      const idusuario = rolFirst.usuario.idusuario;
      await this.asignarRolRepository.remove( rolFirst );

      return await this.findAll( { fkidusuario: idusuario } );
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }
}
