import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { AsistenciacursoService } from './asistenciacurso.service';
import { AsistenciaCurso } from './entities/asistenciacurso.entity';
import { AsistenciacursoController } from './asistenciacurso.controller';

@Module({
  controllers: [AsistenciacursoController],
  providers: [AsistenciacursoService],
  exports: [AsistenciacursoService],
  imports: [
    TypeOrmModule.forFeature( [
      AsistenciaCurso,
    ] ),
    AuthModule,
  ],
})
export class AsistenciacursoModule {}
