
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { Programa } from './entities/programa.entity';

@Injectable()
export class ProgramaService {
  private listPrograma: Programa[] = [];
  private readonly logger = new Logger('ProgramaService');

  constructor(
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listPrograma = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listPrograma, totalPagination] = await this.programaRepository.findAndCount( {
          take: limit,
          skip: offset,
          where: { },
          order: {
            created_at: "DESC",
          },
        } );
      } else {
        [listPrograma, totalPagination] = await this.programaRepository.findAndCount( {
          where: { },
          order: {
            created_at: "DESC",
          },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayPrograma: listPrograma,
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

  async store(createProgramaDto: CreateProgramaDto) {
    try {
      const programa = this.programaRepository.create( {
        fkidunidadnegocio: createProgramaDto.fkidunidadnegocio,
        unidadnegocio: createProgramaDto.unidadnegocio,
        fkidunidadadministrativa: createProgramaDto.fkidunidadadministrativa,
        unidadadministrativa: createProgramaDto.unidadadministrativa,
        fkidunidadacademica: createProgramaDto.fkidunidadacademica,
        unidadacademica: createProgramaDto.unidadacademica,
        fkidmodalidadacademica: createProgramaDto.fkidmodalidadacademica,
        modalidadacademica: createProgramaDto.modalidadacademica,
        fkidnivelacademico: createProgramaDto.fkidnivelacademico,
        nivelacademico: createProgramaDto.nivelacademico,
        codigo: createProgramaDto.codigo,
        sigla: createProgramaDto.sigla,
        descripcion: createProgramaDto.descripcion,
        created_at: this.getDateTime(),
      } );
      await this.programaRepository.save( programa );
      return {
        resp: 1, error: false,
        message: 'Programa registrado éxitosamente.',
        programa: programa,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idprograma: string) {
    const programa = await this.programaRepository.findOneBy( {
      idprograma: idprograma,
    } );
    return programa;
  }

  async edit(idprograma: string) {
    try {
      const programa = await this.findOne(idprograma);
      if ( programa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          programa: programa,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Programa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idprograma: string) {
    try {
      const programa = await this.findOne(idprograma);
      if ( programa ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          programa: programa,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Programa no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  update(id: string, updateProgramaDto: UpdateProgramaDto) {
    let programaDB = this.findOne(id);
    if ( programaDB === null ) {
      return {
        resp: 0, error: false,
        message: 'Programa no existe.',
      };
    }

    // this.listPrograma = this.listPrograma.map( (programa) => {
    //   if ( programa.idprograma === id ) {
    //     programaDB.updated_at = '';
    //     programaDB = {
    //       ...programaDB,
    //       ...updateProgramaDto,
    //       idprograma: id,
    //       concurrencia: programa.concurrencia + 1,
    //     };
    //     return programaDB;
    //   }
    //   return programa;
    // } );
    return {
      resp: 1,
      error: false,
      message: 'Programa actualizado éxitosamente.',
      programa: programaDB,
    };
  }

  async delete( idprograma: string ) {
    try {
      let programa = await this.findOne(idprograma);
      if ( programa === null ) {
        return {
          resp: 0, error: true,
          message: 'Programa no existe.',
        };
      }
      await this.programaRepository.remove( programa );
      return {
        resp: 1, error: false,
        message: 'Programa eliminado éxitosamente.',
        programa: programa,
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
