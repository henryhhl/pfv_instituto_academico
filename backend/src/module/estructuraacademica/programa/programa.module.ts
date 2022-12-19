import { Module } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Programa } from './entities/programa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { ProgramaDivisionAcademicaDetalle } from './entities/programadivisionacademicadetalle.entity';
import { ProgramaDivisionAcademicaMateriaDetalle } from './entities/programadivisionacademicamateriadetalle.entity';

@Module({
  controllers: [ProgramaController],
  providers: [ProgramaService],
  exports: [ProgramaService],
  imports: [
    // MongooseModule.forFeature( [
    //   {
    //     name: Programa.name,
    //     schema: ProgramaSchema,
    //   },
    // ] ),
    TypeOrmModule.forFeature( [
      Programa, ProgramaDivisionAcademicaDetalle,
      ProgramaDivisionAcademicaMateriaDetalle,
    ] ),
    AuthModule,
  ],
})
export class ProgramaModule {}
