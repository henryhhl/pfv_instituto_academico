import { Module } from '@nestjs/common';
import { CiudadclasificacionService } from './ciudadclasificacion.service';
import { CiudadclasificacionController } from './ciudadclasificacion.controller';

@Module({
  controllers: [CiudadclasificacionController],
  providers: [CiudadclasificacionService]
})
export class CiudadclasificacionModule {}
