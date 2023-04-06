import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { InscripcionCursoService } from './inscripcioncurso.service';
import { InscripcionCurso } from './entities/inscripcioncurso.entity';
import { InscripcionCursoController } from './inscripcioncurso.controller';
import { CursoModule } from '../../ofertaacademica/curso/curso.module';
import { NotacursoModule } from '../../nota/notacurso/notacurso.module';
import { EstudianteModule } from '../../persona/estudiante/estudiante.module';
import { TurnoModule } from '../../estructurainstitucional/turno/turno.module';
import { UnidadNegocioModule } from '../../parametro/unidadnegocio/unidadnegocio.module';
import { AsistenciacursoModule } from '../../nota/asistenciacurso/asistenciacurso.module';
import { ModalidadAcademicaModule } from '../../parametro/modalidadacademica/modalidadacademica.module';
import { UnidadacademicaModule } from '../../estructuraacademica/unidadacademica/unidadacademica.module';
import { GestionPeriodoModule } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.module';
import { UnidadAdministrativaModule } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.module';

@Module({
  controllers: [InscripcionCursoController],
  providers: [InscripcionCursoService],
  exports: [InscripcionCursoService],
  imports: [
    TypeOrmModule.forFeature( [
      InscripcionCurso,
    ] ),
    AuthModule,
    TurnoModule,
    CursoModule,
    EstudianteModule,
    UnidadNegocioModule,
    GestionPeriodoModule,
    UnidadacademicaModule,
    ModalidadAcademicaModule,
    UnidadAdministrativaModule,
    AsistenciacursoModule,
    NotacursoModule,
  ],
})
export class InscripcioncursoModule {}
