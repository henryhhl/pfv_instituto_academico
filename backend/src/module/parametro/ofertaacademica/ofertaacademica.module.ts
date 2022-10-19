
import { Module } from '@nestjs/common';
import { OfertaAcademicaService } from './ofertaacademica.service';
import { OfertaAcademicaController } from './ofertaacademica.controller';

@Module({
  controllers: [OfertaAcademicaController],
  providers: [OfertaAcademicaService]
})
export class OfertaacademicaModule {}
