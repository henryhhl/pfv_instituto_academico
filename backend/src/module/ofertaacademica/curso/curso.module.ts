import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { CursoController } from './curso.controller';
import { Curso } from './entities/curso.entity';
import { CursoDocenteDetalle } from './entities/cursodocentedetalle.entity';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService],
  imports: [
    TypeOrmModule.forFeature( [
      Curso, CursoDocenteDetalle,
    ] ),
    AuthModule,
  ],
})
export class CursoModule {}
