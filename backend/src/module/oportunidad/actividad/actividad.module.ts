import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { ActividadService } from './actividad.service';
import { Actividad } from './entities/actividad.entity';
import { ActividadController } from './actividad.controller';
import { NegocioModule } from '../negocio/negocio.module';
import { OportunidadModule } from '../oportunidad/oportunidad.module';

@Module({
  controllers: [ActividadController],
  providers: [ActividadService],
  imports: [
    TypeOrmModule.forFeature( [
      Actividad,
    ] ),
    AuthModule,
    NegocioModule,
    OportunidadModule,
  ],
})
export class ActividadModule {}
