import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TipoRolModule } from '../module/seguridad/tiporol/tiporol.module';
import { TipoPermisoModule } from '../module/seguridad/tipopermiso/tipopermiso.module';
import { TipoMateriaModule } from '../module/parametro/tipomateria/tipomateria.module';
import { RolModule } from '../module/seguridad/rol/rol.module';
import { UsuarioModule } from '../module/seguridad/usuario/usuario.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TipoRolModule, TipoPermisoModule, TipoMateriaModule, RolModule, UsuarioModule],
})
export class SeedModule {}
