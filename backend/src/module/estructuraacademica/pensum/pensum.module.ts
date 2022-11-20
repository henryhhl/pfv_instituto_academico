import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PensumService } from './pensum.service';
import { Pensum } from './entities/pensum.entity';
import { AuthModule } from '../../auth/auth.module';
import { PensumController } from './pensum.controller';
import { PensumDivisionAcademicaDetalle } from './entities/pensumdivisionacademicadetalle.entity';
import { PensumDivisionAcademicaMateriaDetalle } from './entities/pensumdivisionacademicamateriadetalle.entity';

@Module({
  controllers: [PensumController],
  providers: [PensumService],
  imports: [
    TypeOrmModule.forFeature( [
      Pensum, PensumDivisionAcademicaDetalle,
      PensumDivisionAcademicaMateriaDetalle,
    ] ),
    AuthModule,
  ],
})
export class PensumModule {}
