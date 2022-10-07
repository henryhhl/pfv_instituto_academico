import { Module } from '@nestjs/common';
import { TipoRolModule } from './tiporol/tiporol.module';
import { TipoPermisoModule } from './tipopermiso/tipopermiso.module';
import { TipoMateriaModule } from './tipomateria/tipomateria.module';
import { SeedModule } from './seed/seed.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UnidadNegocioModule } from './unidadnegocio/unidadnegocio.module';
import { OfertaacademicaModule } from './ofertaacademica/ofertaacademica.module';
import { NivelacademicoModule } from './nivelacademico/nivelacademico.module';
import { ModalidadacademicaModule } from './modalidadacademica/modalidadacademica.module';
import { PeriodoModule } from './periodo/periodo.module';
import { MateriaModule } from './materia/materia.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { PermisoModule } from './permiso/permiso.module';

// npm i -g @nestjs/cli
// nest new project-name 

// nest g mo tiporol -> generar modulo
// nest g co tiporol -> generar controlador
// nest g s tiporol  -> generar servicio

// nest g resource <nombre>

@Module({
  imports: [
    TipoRolModule, TipoPermisoModule, TipoMateriaModule, SeedModule, RolModule, 
    UsuarioModule, UnidadNegocioModule, OfertaacademicaModule, NivelacademicoModule, 
    ModalidadacademicaModule, PeriodoModule, MateriaModule, CiudadModule, PermisoModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule {}
