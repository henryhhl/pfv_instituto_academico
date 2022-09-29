import { Module } from '@nestjs/common';
import { TipoPermisoController } from './tipopermiso.controller';
import { TipoPermisoService } from './tipopermiso.service';

@Module({
  controllers: [TipoPermisoController],
  providers: [TipoPermisoService],
  exports: [TipoPermisoService],
})
export class TipoPermisoModule {}
