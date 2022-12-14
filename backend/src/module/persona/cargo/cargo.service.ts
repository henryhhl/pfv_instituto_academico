import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Cargo } from './entities/cargo.entity';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class CargoService {
  private readonly logger = new Logger('CargoService');

  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listCargo = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listCargo, totalPagination] = await this.cargoRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listCargo, totalPagination] = await this.cargoRepository.findAndCount( {
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayCargo: listCargo,
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

  async store(createCargoDto: CreateCargoDto) {
    try {
      const cargo = this.cargoRepository.create( {
        descripcion: createCargoDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.cargoRepository.save( cargo );
      return {
        resp: 1, error: false,
        message: 'Cargo registrado éxitosamente.',
        cargo: cargo,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idcargo: string) {
    const cargo = await this.cargoRepository.findOneBy( {
      idcargo: idcargo,
    } );
    return cargo;
  }

  async edit(idcargo: string) {
    try {
      const cargo = await this.findOne(idcargo);
      if ( cargo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          cargo: cargo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Cargo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idcargo: string) {
    try {
      const cargo = await this.findOne(idcargo);
      if ( cargo ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          cargo: cargo,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Cargo no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idcargo: string, updateCargoDto: UpdateCargoDto) {
    const cargo = await this.findOne(idcargo);
    if ( cargo === null ) {
      return {
        resp: 0, error: false,
        message: 'Cargo no existe.',
      };
    }
    const cargoPreLoad = await this.cargoRepository.preload( {
      idcargo: idcargo,
      ...updateCargoDto,
      concurrencia: cargo.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( cargoPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Cargo no existe.',
      };
    }
    const cargoUpdate = await this.cargoRepository.save( cargoPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Cargo actualizado éxitosamente.',
      cargo: cargo,
      cargoUpdate: cargoUpdate,
    };
  }

  async delete(idcargo: string) {
    try {
      let cargo = await this.findOne(idcargo);
      if ( cargo === null ) {
        return {
          resp: 0, error: true,
          message: 'Cargo no existe.',
        };
      }
      await this.cargoRepository.remove( cargo );
      return {
        resp: 1, error: false,
        message: 'Cargo eliminado éxitosamente.',
        cargo: cargo,
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
