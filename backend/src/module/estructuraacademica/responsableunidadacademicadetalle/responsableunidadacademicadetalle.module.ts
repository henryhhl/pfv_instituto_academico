import { Module } from '@nestjs/common';
import { ResponsableUnidadAcademicaDetalleService } from './responsableunidadacademicadetalle.service';
import { ResponsableUnidadAcademicaDetalleController } from './responsableunidadacademicadetalle.controller';

@Module({
  controllers: [ResponsableUnidadAcademicaDetalleController],
  providers: [ResponsableUnidadAcademicaDetalleService]
})
export class ResponsableUnidadAcademicaDetalleModule {}
