import { Module } from '@nestjs/common';
import { AsistenciagrupoService } from './asistenciagrupo.service';
import { AsistenciagrupoController } from './asistenciagrupo.controller';

@Module({
  controllers: [AsistenciagrupoController],
  providers: [AsistenciagrupoService]
})
export class AsistenciagrupoModule {}
