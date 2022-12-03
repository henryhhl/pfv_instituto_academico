import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { ActividadService } from './actividad.service';
import { Actividad } from './entities/actividad.entity';
import { ActividadController } from './actividad.controller';

@Module({
  controllers: [ActividadController],
  providers: [ActividadService],
  imports: [
    TypeOrmModule.forFeature( [
      Actividad,
    ] ),
    AuthModule,
  ],
})
export class ActividadModule {}
