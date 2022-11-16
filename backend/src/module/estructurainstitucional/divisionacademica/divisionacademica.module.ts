import { Module } from '@nestjs/common';
import { DivisionAcademicaService } from './divisionacademica.service';
import { DivisionAcademicaController } from './divisionacademica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionAcademica } from './entities/divisionacademica.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [DivisionAcademicaController],
  providers: [DivisionAcademicaService],
  imports: [
    TypeOrmModule.forFeature( [
      DivisionAcademica,
    ] ),
    AuthModule,
  ],
})
export class DivisionAcademicaModule {}
