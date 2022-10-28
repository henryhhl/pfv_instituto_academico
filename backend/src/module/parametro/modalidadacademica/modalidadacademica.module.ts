import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModalidadAcademicaService } from './modalidadacademica.service';
import { ModalidadAcademicaController } from './modalidadacademica.controller';
import { ModalidadAcademica } from './entities/modalidadacademica.entity';

@Module({
  controllers: [ModalidadAcademicaController],
  providers: [ModalidadAcademicaService],
  imports: [
    TypeOrmModule.forFeature( [
      ModalidadAcademica
    ] ),
  ],
})
export class ModalidadAcademicaModule {}
