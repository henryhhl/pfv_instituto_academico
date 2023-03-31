import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscripcionGrupoService } from './inscripciongrupo.service';
import { InscripcionGrupo } from './entities/inscripciongrupo.entity';
import { InscripcionGrupoController } from './inscripciongrupo.controller';
import { AuthModule } from '../../auth/auth.module';
import { MateriaModule } from '../../parametro/materia/materia.module';
import { GrupoModule } from '../../ofertaacademica/grupo/grupo.module';
import { EstudianteModule } from '../../persona/estudiante/estudiante.module';
import { PensumModule } from '../../estructuraacademica/pensum/pensum.module';
import { ProgramaModule } from '../../estructuraacademica/programa/programa.module';
import { UnidadNegocioModule } from '../../parametro/unidadnegocio/unidadnegocio.module';
import { UnidadacademicaModule } from '../../estructuraacademica/unidadacademica/unidadacademica.module';
import { GestionPeriodoModule } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.module';
import { UnidadAdministrativaModule } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.module';
import { DocenteModule } from '../../persona/docente/docente.module';
import { AsistenciagrupoModule } from '../../nota/asistenciagrupo/asistenciagrupo.module';
import { NotagrupoModule } from '../../nota/notagrupo/notagrupo.module';

@Module({
  controllers: [InscripcionGrupoController],
  providers: [InscripcionGrupoService],
  exports: [InscripcionGrupoService],
  imports: [
    TypeOrmModule.forFeature( [
      InscripcionGrupo,
    ] ),
    AuthModule,
    EstudianteModule,
    GestionPeriodoModule,
    UnidadNegocioModule,
    UnidadacademicaModule,
    UnidadAdministrativaModule,
    ProgramaModule,
    PensumModule,
    MateriaModule,
    GrupoModule,
    DocenteModule,
    AsistenciagrupoModule,
    NotagrupoModule,
  ],
})
export class InscripcionGrupoModule {}
