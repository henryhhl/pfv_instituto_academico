import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadService {

  private readonly logger = new Logger('CiudadService');

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAll() {
    try {
      const [listCiudad, totalCount] = await this.ciudadRepository.findAndCount( {
        where: { },
        order: { created_at: "ASC", },
      } );
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayCiudad: listCiudad,
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

  async store(createCiudadDto: CreateCiudadDto) {
    try {
      const ciudad = this.ciudadRepository.create( {
        fkidtipociudad: createCiudadDto.fkidtipociudad,
        tipociudad: createCiudadDto.tipociudad,
        fkidciudadpadre: createCiudadDto.fkidciudadpadre,
        sigla: createCiudadDto.sigla,
        descripcion: createCiudadDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.ciudadRepository.save( ciudad );
      return {
        resp: 1, error: false,
        message: 'Ciudad registrado éxitosamente.',
        ciudad: ciudad,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idciudad: string) {
    const ciudad = await this.ciudadRepository.findOneBy( {
      idciudad: idciudad,
    } );
    return ciudad;
  }

  async edit(idciudad: string) {
    try {
      const ciudad = await this.findOne(idciudad);
      if ( ciudad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          ciudad: ciudad,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Ciudad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idciudad: string) {
    try {
      const ciudad = await this.findOne(idciudad);
      if ( ciudad ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          ciudad: ciudad,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Ciudad no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idciudad: string, updateCiudadDto: UpdateCiudadDto ) {
    const ciudad = await this.findOne(idciudad);
    if ( ciudad === null ) {
      return {
        resp: 0, error: false,
        message: 'Ciudad no existe.',
      };
    }
    const ciudadPreLoad = await this.ciudadRepository.preload( {
      idciudad: idciudad,
      ...updateCiudadDto,
      concurrencia: ciudad.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( ciudadPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Ciudad no existe.',
      };
    }
    const ciudadUpdate = await this.ciudadRepository.save( ciudadPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Ciudad actualizado éxitosamente.',
      ciudad: ciudad,
      ciudadUpdate: ciudadUpdate,
    };
  }

  async delete(idciudad: string) {
    try {
      let ciudad = await this.findOne(idciudad);
      if ( ciudad === null ) {
        return {
          resp: 0, error: true,
          message: 'Ciudad no existe.',
        };
      }
      if ( ciudad.isdelete == "N" ) {
        return {
          resp: 0, error: true,
          message: "Ciudad no permitido eliminar.",
        };
      }
      const ciudadDelete = await this.ciudadRepository.remove( ciudad );
      return {
        resp: 1, error: false,
        message: 'Ciudad eliminado éxitosamente.',
        ciudad: ciudad,
        ciudadDelete: ciudadDelete,
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
