import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TipoRolModule } from '../tiporol/tiporol.module';
import { TipoPermisoModule } from '../tipopermiso/tipopermiso.module';
import { TipoMateriaModule } from '../tipomateria/tipomateria.module';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TipoRolModule, TipoPermisoModule, TipoMateriaModule, RolModule, UsuarioModule],
})
export class SeedModule {}
