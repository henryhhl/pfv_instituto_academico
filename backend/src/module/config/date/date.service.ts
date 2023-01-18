import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Dia } from './entities/dia.entity';

@Injectable()
export class DateService {
  private readonly logger = new Logger('DateService');

  constructor(
    @InjectRepository(Dia)
    private readonly dayRepository: Repository<Dia>,
  ) {}

  async findAllDays() {
    try {
      let listDays = [];
      let totalPagination = 0;

      await this.checkDataDays();
      
      [listDays, totalPagination] = await this.dayRepository.findAndCount( {
        order: { created_at: "ASC", },
      } );

      return {
        resp: 1, error: false,
        message: 'Servicio realizado exitosamente.',
        arrayDays: listDays,
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

  async findOneDay(iddia: string) {
    try {
      const diaFirst = await this.dayRepository.findOne( {
        where: { iddia },
      } );
      return diaFirst;
    } catch (error) {
      return null;
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

  private async checkDataDays() {
    const listDays = await this.dayRepository.find( {} );
    if ( listDays.length === 0 ) {
      for (let index = 0; index < this.onDefaultDays().length; index++) {
        const item = this.onDefaultDays()[index];
        const dayCreate = this.dayRepository.create( {
          ...item,
          created_at: this.getDateTime(),
        } );
        await this.dayRepository.save( dayCreate );
      }
    }
  }

  private onDefaultDays() {
    return [1, 2, 3, 4, 5, 6, 7].map( (item) => {
      switch (item) {
        case 1:
          return {
            sigla: 'lu', descripcion: 'Lunes',
          };
        case 2:
          return {
            sigla: 'ma', descripcion: 'Martes',
          };
        case 3:
          return {
            sigla: 'mi', descripcion: 'Miércoles',
          };
        case 4:
          return {
            sigla: 'ju', descripcion: 'Jueves',
          };
        case 5:
          return {
            sigla: 'vi', descripcion: 'Viernes',
          };
        case 6:
          return {
            sigla: 'sá', descripcion: 'Sábado',
          };
        default:
          return {
            sigla: 'do', descripcion: 'Domingo',
          };
      }
  } );
};

}
