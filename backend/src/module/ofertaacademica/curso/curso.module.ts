import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { AuthModule } from '../../auth/auth.module';
import { CursoController } from './curso.controller';
import { CursoHorario } from './entities/cursohorario.entity';
import { CursoDocenteDetalle } from './entities/cursodocentedetalle.entity';
import { CursoHorarioDetalle } from './entities/cursohorariodetalle.entity';
import { CursoParametroCalificacion } from './entities/cursoparametrocalificacion.entity';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService],
  imports: [
    TypeOrmModule.forFeature( [
      Curso, CursoDocenteDetalle,
      CursoHorario, CursoHorarioDetalle, CursoParametroCalificacion,
    ] ),
    AuthModule,
  ],
})
export class CursoModule {}
