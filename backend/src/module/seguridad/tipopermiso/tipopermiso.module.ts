import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPermiso } from './entities/tipoPermiso.entity';
import { TipoPermisoController } from './tipopermiso.controller';
import { TipoPermisoService } from './tipopermiso.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [TipoPermisoController],
  providers: [TipoPermisoService],
  exports: [TipoPermisoService],
  imports: [
    TypeOrmModule.forFeature( [
      TipoPermiso,
    ] ),
    AuthModule,
  ],
})
export class TipoPermisoModule {}
