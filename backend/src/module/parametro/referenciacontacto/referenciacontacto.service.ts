
import { Like, Repository } from 'typeorm'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateReferenciaContactoDto } from './dto/create-referenciacontacto.dto';
import { UpdateReferenciaContactoDto } from './dto/update-referenciacontacto.dto';
import { ReferenciaContacto } from './entities/referenciacontacto.entity';

@Injectable()
export class ReferenciaContactoService {
  private readonly logger = new Logger('ReferenciaContactoService');

  constructor(
    @InjectRepository(ReferenciaContacto)
    private readonly referenciaContactoRepository: Repository<ReferenciaContacto>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = true, } = paginationDto;
      let listReferenciaContacto = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listReferenciaContacto, totalPagination] = await this.referenciaContactoRepository.findAndCount( {
          take: limit,
          skip: offset,
          where: {
            descripcion: Like( '%' + search + '%', ),
          },
          order: {
            created_at: "DESC",
          },
        } );
      } else {
        [listReferenciaContacto, totalPagination] = await this.referenciaContactoRepository.findAndCount( {
          where: {
            descripcion: Like( '%' + search + '%', ),
          },
          order: {
            created_at: "DESC",
          },
        } );
      }
      
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayReferenciaContacto: listReferenciaContacto,
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

  async store(createReferenciaContactoDto: CreateReferenciaContactoDto) {
    try {

      const referenciaContacto = this.referenciaContactoRepository.create( {
        descripcion: createReferenciaContactoDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.referenciaContactoRepository.save( referenciaContacto );
  
      return {
        resp: 1, error: false,
        message: 'Referencia Contacto registrado éxitosamente.',
        referenciaContacto: referenciaContacto,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idreferenciacontacto: string) {
    const referenciaContacto = await this.referenciaContactoRepository.findOneBy( {
      idreferenciacontacto,
    } );
    return referenciaContacto;
  }

  async edit(idreferenciacontacto: string) {
    try {
      const referenciaContacto = await this.findOne(idreferenciacontacto);
      if ( referenciaContacto ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            referenciaContacto: referenciaContacto,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Referencia Contacto no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idreferenciacontacto: string) {
    try {
      const referenciaContacto = await this.findOne(idreferenciacontacto);
      if ( referenciaContacto ) {
          return {
            resp: 1, error: false,
            message: 'Servicio realizado exitosamente.',
            referenciaContacto: referenciaContacto,
          };
      }
      return {
        resp: 0, error: false,
        message: 'Referencia Contacto no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update( idreferenciacontacto: string, updateReferenciacontactoDto: UpdateReferenciaContactoDto ) {
    const referenciaContacto = await this.findOne(idreferenciacontacto);
    if ( referenciaContacto === null ) {
      return {
        resp: 0, error: false,
        message: 'Referencia Contacto no existe.',
      };
    }
    const referenciaContactoPreLoad = await this.referenciaContactoRepository.preload( {
      idreferenciacontacto: idreferenciacontacto,
      ...updateReferenciacontactoDto,
      concurrencia: referenciaContacto.concurrencia + 1,
      updated_at: this.getDateTime(),
    } );

    if ( referenciaContactoPreLoad === null ) {
      return {
        resp: 0, error: false,
        message: 'Referencia Contacto no existe.',
      };
    }
    const referenciaContactoUpdate = await this.referenciaContactoRepository.save( referenciaContactoPreLoad );
    return {
      resp: 1,
      error: false,
      message: 'Referencia Contacto actualizado éxitosamente.',
      referenciaContacto: referenciaContacto,
      referenciaContactoUpdate: referenciaContactoUpdate,
    };
  }

  async delete( idreferenciacontacto: string ) {
    try {
      let referenciaContacto = await this.findOne(idreferenciacontacto);
      if ( referenciaContacto === null ) {
        return {
          resp: 0, error: true,
          message: 'Referencia Contacto no existe.',
        };
      }
      await this.referenciaContactoRepository.remove( referenciaContacto );
      return {
        resp: 1, error: false,
        message: 'Referencia Contacto eliminado éxitosamente.',
        referenciaContacto: referenciaContacto,
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
