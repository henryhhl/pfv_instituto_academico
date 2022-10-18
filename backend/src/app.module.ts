import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

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
import { CiudadclasificacionModule } from './module/estructuraacademica/ciudadclasificacion/ciudadclasificacion.module';
import { UnidadAdministrativaModule } from './module/estructuraacademica/unidadadministrativa/unidadadministrativa.module';
import { CiudadModule } from './module/parametro/ciudad/ciudad.module';
import { PermisoModule } from './module/seguridad/permiso/permiso.module';
import { UsuarioRolDetalleModule } from './module/seguridad/usuarioroldetalle/usuarioroldetalle.module';
import { RolPermisoDetalleModule } from './module/seguridad/rolpermisodetalle/rolpermisodetalle.module';
import { UnidadacademicaModule } from './module/estructuraacademica/unidadacademica/unidadacademica.module';
import { ProgramaModule } from './module/estructuraacademica/programa/programa.module';
import { PensumModule } from './module/estructuraacademica/pensum/pensum.module';

// npm i -g @nestjs/cli
// nest new project-name 

// nest g mo tiporol -> generar modulo
// nest g co tiporol -> generar controlador
// nest g s tiporol  -> generar servicio

// nest g resource <nombre>

@Module({
  imports: [
    ConfigModule.forRoot( {
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema,
    } ),

    ServeStaticModule.forRoot( {
      rootPath: join(__dirname, '..', 'public'),
    } ),

    // MongooseModule.forRoot( process.env.MONGO_DB || 'mongodb://localhost:27017/instituto-academico' ),

    TipoRolModule, TipoPermisoModule, TipoMateriaModule, SeedModule, RolModule, 
    UsuarioModule, UnidadNegocioModule, OfertaacademicaModule, NivelacademicoModule, 
    ModalidadacademicaModule, PeriodoModule, MateriaModule, CiudadModule, PermisoModule, 
    CiudadclasificacionModule, UnidadAdministrativaModule, UsuarioRolDetalleModule, 
    RolPermisoDetalleModule, UnidadacademicaModule, ProgramaModule, PensumModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule {}
