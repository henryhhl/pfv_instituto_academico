import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModalidadAcademicaService } from './modalidadacademica.service';
import { ModalidadAcademicaController } from './modalidadacademica.controller';
import { ModalidadAcademica } from './entities/modalidadacademica.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [ModalidadAcademicaController],
  providers: [ModalidadAcademicaService],
  imports: [
    TypeOrmModule.forFeature( [
      ModalidadAcademica,
    ] ),
    AuthModule,
  ],
})
export class ModalidadAcademicaModule {}
