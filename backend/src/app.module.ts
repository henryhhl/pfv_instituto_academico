import { Module } from '@nestjs/common';
import { TipoRolModule } from './tiporol/tiporol.module';
import { TipoPermisoModule } from './tipopermiso/tipopermiso.module';
import { TipoMateriaModule } from './tipomateria/tipomateria.module';
import { SeedModule } from './seed/seed.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';

// nest g mo tiporol -> generar modulo
// nest g co tiporol -> generar controlador
// nest g s tiporol  -> generar servicio

// nest g resource <nombre>

@Module({
  imports: [TipoRolModule, TipoPermisoModule, TipoMateriaModule, SeedModule, RolModule, UsuarioModule],
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule {}
