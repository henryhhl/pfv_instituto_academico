import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

import { TipoRolModule } from './module/seguridad/tiporol/tiporol.module';
import { TipoPermisoModule } from './module/seguridad/tipopermiso/tipopermiso.module';
import { TipoMateriaModule } from './module/parametro/tipomateria/tipomateria.module';
import { SeedModule } from './seed/seed.module';
import { RolModule } from './module/seguridad/rol/rol.module';
import { UsuarioModule } from './module/seguridad/usuario/usuario.module';
import { UnidadNegocioModule } from './module/parametro/ciudad/unidadnegocio/unidadnegocio.module';
import { OfertaacademicaModule } from './module/parametro/ofertaacademica/ofertaacademica.module';
import { NivelacademicoModule } from './module/parametro/nivelacademico/nivelacademico.module';
import { ModalidadacademicaModule } from './module/parametro/modalidadacademica/modalidadacademica.module';
import { PeriodoModule } from './module/parametro/periodo/periodo.module';
import { MateriaModule } from './module/parametro/materia/materia.module';
import { UnidadAdministrativaModule } from './module/estructuraacademica/unidadadministrativa/unidadadministrativa.module';
import { CiudadModule } from './module/parametro/ciudad/ciudad.module';
import { PermisoModule } from './module/seguridad/permiso/permiso.module';
import { UsuarioRolDetalleModule } from './module/seguridad/usuarioroldetalle/usuarioroldetalle.module';
import { RolPermisoDetalleModule } from './module/seguridad/rolpermisodetalle/rolpermisodetalle.module';
import { UnidadacademicaModule } from './module/estructuraacademica/unidadacademica/unidadacademica.module';
import { ProgramaModule } from './module/estructuraacademica/programa/programa.module';
import { PensumModule } from './module/estructuraacademica/pensum/pensum.module';
import { ResponsableModule } from './module/estructuraacademica/responsable/responsable.module';
import { ReferenciaContactoModule } from './module/parametro/referenciacontacto/referenciacontacto.module';
import { TipoCiudadModule } from './module/parametro/tipociudad/tipociudad.module';
import { ResponsableUnidadAcademicaDetalleModule } from './module/estructuraacademica/responsableunidadacademicadetalle/responsableunidadacademicadetalle.module';
import { ResponsablereferenciacontactodetalleModule } from './module/estructuraacademica/responsablereferenciacontactodetalle/responsablereferenciacontactodetalle.module';

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
    UnidadAdministrativaModule, UsuarioRolDetalleModule, 
    RolPermisoDetalleModule, UnidadacademicaModule, ProgramaModule, PensumModule, ResponsableModule, 
    ReferenciaContactoModule, TipoCiudadModule, ResponsableUnidadAcademicaDetalleModule, ResponsablereferenciacontactodetalleModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule {}
