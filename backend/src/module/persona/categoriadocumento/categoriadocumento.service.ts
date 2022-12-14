import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CategoriaDocumento } from './entities/categoriadocumento.entity';
import { CreateCategoriaDocumentoDto } from './dto/create-categoriadocumento.dto';
import { UpdateCategoriaDocumentoDto } from './dto/update-categoriadocumento.dto';

@Injectable()
export class CategoriaDocumentoService {
  private readonly logger = new Logger('CategoriaDocumentoService');

  constructor(
    @InjectRepository(CategoriaDocumento)
    private readonly categoriaDocumentoRepository: Repository<CategoriaDocumento>,
  ) {}

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 1, offset = 0, search = "", esPaginate = false, } = paginationDto;
      let listCategoriaDocumento = [];
      let totalPagination = 0;
      if ( esPaginate ) {
        [listCategoriaDocumento, totalPagination] = await this.categoriaDocumentoRepository.findAndCount( {
          take: limit, skip: offset,
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      } else {
        [listCategoriaDocumento, totalPagination] = await this.categoriaDocumentoRepository.findAndCount( {
          where: [
            { descripcion: ILike( '%' + search + '%', ), },
          ],
          order: { created_at: "DESC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayCategoriaDocumento: listCategoriaDocumento,
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

  async store(createCategoriadocumentoDto: CreateCategoriaDocumentoDto) {
    try {
      const categoriaDocumento = this.categoriaDocumentoRepository.create( {
        ...createCategoriadocumentoDto,
        created_at: this.getDateTime(),
      } );
      await this.categoriaDocumentoRepository.save( categoriaDocumento );
      return {
        resp: 1, error: false,
        message: 'Categoria Documento registrado éxitosamente.',
        categoriaDocumento: categoriaDocumento,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idcategoriadocumento: string) {
    const categoriaDocumento = await this.categoriaDocumentoRepository.findOneBy( {
      idcategoriadocumento: idcategoriadocumento,
    } );
    return categoriaDocumento;
  }

  async edit(idcategoriadocumento: string) {
    try {
      const categoriaDocumento = await this.findOne(idcategoriadocumento);
      if ( categoriaDocumento ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          categoriaDocumento: categoriaDocumento,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Categoria Documento no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idcategoriadocumento: string) {
    try {
      const categoriaDocumento = await this.findOne(idcategoriadocumento);
      if ( categoriaDocumento ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          categoriaDocumento: categoriaDocumento,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Categoria Documento no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idcategoriadocumento: string, updateCategoriadocumentoDto: UpdateCategoriaDocumentoDto) {
    try {
      const categoriaDocumento = await this.findOne(idcategoriadocumento);
      if ( categoriaDocumento === null ) {
        return {
          resp: 0, error: false,
          message: 'Categoria Documento no existe.',
        };
      }
      const categoriaDocumentoPreLoad = await this.categoriaDocumentoRepository.preload( {
        idcategoriadocumento: idcategoriadocumento,
        ...updateCategoriadocumentoDto,
        concurrencia: categoriaDocumento.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( categoriaDocumentoPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Categoria Documento no existe.',
        };
      }
      const categoriaDocumentoUpdate = await this.categoriaDocumentoRepository.save( categoriaDocumentoPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Categoria Documento actualizado éxitosamente.',
        categoriaDocumento: categoriaDocumento,
        categoriaDocumentoUpdate: categoriaDocumentoUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idcategoriadocumento: string) {
    try {
      let categoriaDocumento = await this.findOne(idcategoriadocumento);
      if ( categoriaDocumento === null ) {
        return {
          resp: 0, error: true,
          message: 'Categoria Documento no existe.',
        };
      }
      await this.categoriaDocumentoRepository.remove( categoriaDocumento );
      return {
        resp: 1, error: false,
        message: 'Categoria Documento eliminado éxitosamente.',
        categoriaDocumento: categoriaDocumento,
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
