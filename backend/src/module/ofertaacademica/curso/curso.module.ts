import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoController } from './curso.controller';
import { Curso } from './entities/curso.entity';
import { CursoHorario } from './entities/cursohorario.entity';
import { NotaCurso } from '../../nota/notacurso/entities/notacurso.entity';
import { CursoDocenteDetalle } from './entities/cursodocentedetalle.entity';
import { CursoHorarioDetalle } from './entities/cursohorariodetalle.entity';
import { CursoParametroCalificacion } from './entities/cursoparametrocalificacion.entity';
import { AsistenciaCurso } from '../../nota/asistenciacurso/entities/asistenciacurso.entity';
import { AuthModule } from '../../auth/auth.module';
import { DocenteModule } from '../../persona/docente/docente.module';
import { NotacursoModule } from '../../nota/notacurso/notacurso.module';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService],
  imports: [
    TypeOrmModule.forFeature( [
      Curso, CursoDocenteDetalle,
      CursoHorario, CursoHorarioDetalle, CursoParametroCalificacion,
      NotaCurso, AsistenciaCurso,
    ] ),
    AuthModule,
    DocenteModule,
    NotacursoModule,
  ],
})
export class CursoModule {}
