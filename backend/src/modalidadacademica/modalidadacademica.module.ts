import { Module } from '@nestjs/common';
import { ModalidadAcademicaService } from './modalidadacademica.service';
import { ModalidadAcademicaController } from './modalidadacademica.controller';

@Module({
  controllers: [ModalidadAcademicaController],
  providers: [ModalidadAcademicaService]
})
export class ModalidadacademicaModule {}
