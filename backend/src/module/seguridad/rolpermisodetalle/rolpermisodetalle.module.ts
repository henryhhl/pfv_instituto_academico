import { Module } from '@nestjs/common';
import { RolPermisoDetalleService } from './rolpermisodetalle.service';
import { RolPermisoDetalleController } from './rolpermisodetalle.controller';
import { PermisoModule } from '../permiso/permiso.module';

@Module({
  controllers: [RolPermisoDetalleController],
  providers: [RolPermisoDetalleService],
  imports: [PermisoModule],
})
export class RolPermisoDetalleModule {}
