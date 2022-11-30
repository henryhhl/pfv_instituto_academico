import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { TipoActividadService } from './tipoactividad.service';
import { TipoActividad } from './entities/tipoactividad.entity';
import { TipoActividadController } from './tipoactividad.controller';

@Module({
  controllers: [TipoActividadController],
  providers: [TipoActividadService],
  imports: [
    TypeOrmModule.forFeature( [
      TipoActividad,
    ] ),
    AuthModule,
  ],
})
export class TipoActividadModule {}
