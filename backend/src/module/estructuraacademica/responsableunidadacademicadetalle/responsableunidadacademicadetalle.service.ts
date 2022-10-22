
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ResponsableUnidadAcademicaDetalle } from './entities/responsableunidadacademicadetalle.entity';

@Injectable()
export class ResponsableUnidadAcademicaDetalleService {
  private listResponsableUnidadAcademicaDetalle: ResponsableUnidadAcademicaDetalle[] = [];

  findAll() {
    return `This action returns all responsableunidadacademicadetalle`;
  }

  store() {}
  
}
