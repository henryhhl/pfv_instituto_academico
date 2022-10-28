import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPermiso } from './entities/tipoPermiso.entity';
import { TipoPermisoController } from './tipopermiso.controller';
import { TipoPermisoService } from './tipopermiso.service';

@Module({
  controllers: [TipoPermisoController],
  providers: [TipoPermisoService],
  exports: [TipoPermisoService],
  imports: [
    TypeOrmModule.forFeature( [
      TipoPermiso
    ] ),
  ],
})
export class TipoPermisoModule {}
