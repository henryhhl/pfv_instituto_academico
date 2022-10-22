import { Controller, Get } from '@nestjs/common';
import { ResponsableUnidadAcademicaDetalleService } from './responsableunidadacademicadetalle.service';

@Controller('responsableunidadacademicadetalle')
export class ResponsableUnidadAcademicaDetalleController {
  constructor(private readonly responsableunidadacademicadetalleService: ResponsableUnidadAcademicaDetalleService) {}

  @Get('/index')
  findAll() {
    return this.responsableunidadacademicadetalleService.findAll();
  }
}
