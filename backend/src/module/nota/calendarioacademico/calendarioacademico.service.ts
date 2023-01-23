import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { PaginationCalendarioAcademicoDto } from './dto/pagination.dto';
import { CalendarioAcademico } from './entities/calendarioacademico.entity';
import { CreateCalendarioAcademicoDto } from './dto/create-calendarioacademico.dto';
import { UpdateCalendarioAcademicoDto } from './dto/update-calendarioacademico.dto';
import { BitacoraService } from '../../seguridad/bitacora/bitacora.service';
import { GestionPeriodoService } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.service';
import { UnidadAdministrativaService } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.service';

@Injectable()
export class CalendarioAcademicoService {
  private readonly logger = new Logger('CalendarioAcademicoService');

  constructor(
    @InjectRepository(CalendarioAcademico)
    private readonly calendarioAcademicoRepository: Repository<CalendarioAcademico>,

    private readonly gestionPeriodoService: GestionPeriodoService,
    private readonly unidadAdministrativaService: UnidadAdministrativaService,
    private readonly bitacoraService: BitacoraService,
  ) {}

  async findAll(paginationDto: PaginationCalendarioAcademicoDto) {
    try {
      const { 
        limit = 1, offset = 0, search = "", esPaginate = false, 
        fkidgestionperiodo = null, fkidunidadadministrativa = null,
      } = paginationDto;
      let listCalendarioAcademico = [];
      let totalPagination = 0;

      const unidadAdministrativa = await this.unidadAdministrativaService.findOne(fkidunidadadministrativa);
      const gestionPeriodo = await this.gestionPeriodoService.findOne(fkidgestionperiodo);

      if ( esPaginate ) {
        [listCalendarioAcademico, totalPagination] = await this.calendarioAcademicoRepository.findAndCount( {
          relations: {
            unidadAdministrativa: true, gestionPeriodo: true,
          },
          take: limit, skip: offset * limit,
          where: [
            { nota: ILike( '%' + search + '%', ), gestionPeriodo, unidadAdministrativa,  },
            { fechanota: ILike( '%' + search + '%', ), gestionPeriodo, unidadAdministrativa, },
          ],
          order: { created_at: "ASC", },
        } );
      } else {
        [listCalendarioAcademico, totalPagination] = await this.calendarioAcademicoRepository.findAndCount( {
          relations: {
            unidadAdministrativa: true, gestionPeriodo: true,
          },
          where: { unidadAdministrativa, gestionPeriodo, },
          order: { created_at: "ASC", },
        } );
      }
      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayCalendarioAcademico: listCalendarioAcademico,
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

  async store(createCalendarioacademicoDto: CreateCalendarioAcademicoDto, { usuario, request }) {
    try {
      const { fkidunidadadministrativa, fkidgestionperiodo, ...toCreate} = createCalendarioacademicoDto;

      const unidadAdministrativa = await this.unidadAdministrativaService.findOne(fkidunidadadministrativa);
      const gestionPeriodo = await this.gestionPeriodoService.findOne(fkidgestionperiodo);

      const calendarioAcademicoCreate = this.calendarioAcademicoRepository.create( {
        ...toCreate,
        unidadAdministrativa,
        gestionPeriodo,
        created_at: this.getDateTime(),
      } );
      const calendarioAcademicoSave = await this.calendarioAcademicoRepository.save( calendarioAcademicoCreate );

      await this.bitacoraService.store( {
        usuario: usuario,
        fkidtabla: calendarioAcademicoSave.idcalendarioacademico,
        tabla: 'calendarioacademico',
        accion: 'Registrar Actividad en Calendario Academico',
        descripcion: `Se realizo con éxito al registrar Actividad en Calendario Academico en fecha: ${calendarioAcademicoSave.fechanota}`,
        event: 'store',
        ip: request.ip, uri: request.originalUrl,
        x_fecha: createCalendarioacademicoDto.x_fecha, x_hora: createCalendarioacademicoDto.x_hora,
      } );
      return {
        resp: 1, error: false,
        message: 'Calendario Academico registrado éxitosamente.',
        calendarioAcademico: calendarioAcademicoSave,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al insertar información con el servidor.',
      };
    }
  }

  async findOne(idcalendarioacademico: string) {
    try {
      const calendarioAcademicoFirst = await this.calendarioAcademicoRepository.findOneBy( {
        idcalendarioacademico,
      } );
      return calendarioAcademicoFirst;
    } catch (error) {
      return null;
    }
  }

  async edit(idcalendarioacademico: string) {
    try {
      const calendarioAcademicoFirst = await this.findOne(idcalendarioacademico);
      if ( calendarioAcademicoFirst ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          calendarioAcademico: calendarioAcademicoFirst,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Calendario Academico no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async show(idcalendarioacademico: string) {
    try {
      const calendarioAcademicoFirst = await this.findOne(idcalendarioacademico);
      if ( calendarioAcademicoFirst ) {
        return {
          resp: 1, error: false,
          message: 'Servicio realizado exitosamente.',
          calendarioAcademico: calendarioAcademicoFirst,
        };
      }
      return {
        resp: 0, error: false,
        message: 'Calendario Academico no existe.',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async update(idcalendarioacademico: string, updateCalendarioacademicoDto: UpdateCalendarioAcademicoDto) {
    try {
      const calendarioAcademicoFirst = await this.findOne(idcalendarioacademico);
      if ( calendarioAcademicoFirst === null ) {
        return {
          resp: 0, error: false,
          message: 'Calendario Academico no existe.',
        };
      }
      const {fkidunidadadministrativa, fkidgestionperiodo, ...toUpdate} = updateCalendarioacademicoDto;

      const unidadAdministrativa = await this.unidadAdministrativaService.findOne(fkidunidadadministrativa);
      const gestionPeriodo = await this.gestionPeriodoService.findOne(fkidgestionperiodo);

      const calendarioAcademicoPreLoad = await this.calendarioAcademicoRepository.preload( {
        idcalendarioacademico: idcalendarioacademico,
        ...toUpdate,
        unidadAdministrativa,
        gestionPeriodo,
        concurrencia: calendarioAcademicoFirst.concurrencia + 1,
        updated_at: this.getDateTime(),
      } );

      if ( calendarioAcademicoPreLoad === null ) {
        return {
          resp: 0, error: false,
          message: 'Calendario Academico no existe.',
        };
      }
      const calendarioAcademicoUpdate = await this.calendarioAcademicoRepository.save( calendarioAcademicoPreLoad );
      return {
        resp: 1,
        error: false,
        message: 'Calendario Academico actualizado éxitosamente.',
        calendarioAcademico: calendarioAcademicoUpdate,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        resp: -1, error: true,
        message: 'Hubo conflictos al consultar información con el servidor.',
      };
    }
  }

  async delete(idcalendarioacademico: string, { usuario, request }) {
    try {
      let calendarioAcademico = await this.findOne(idcalendarioacademico);
      if ( calendarioAcademico === null ) {
        return {
          resp: 0, error: true,
          message: 'Calendario Academico no existe.',
        };
      }

      await this.bitacoraService.store( {
        usuario: usuario,
        fkidtabla: calendarioAcademico.idcalendarioacademico,
        tabla: 'calendarioacademico',
        accion: 'Eliminar Actividad en Calendario Academico',
        descripcion: `Se realizo con éxito al eliminar Actividad en Calendario Academico de fecha: ${calendarioAcademico.fechanota}`,
        event: 'delete',
        ip: request.ip, uri: request.originalUrl,
        x_fecha: request.query.x_fecha, x_hora: request.query.x_hora,
      } );
      
      await this.calendarioAcademicoRepository.remove( calendarioAcademico );
      
      return {
        resp: 1, error: false,
        message: 'Calendario Academico eliminado éxitosamente.',
        calendarioAcademico: calendarioAcademico,
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
