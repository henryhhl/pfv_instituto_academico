import { Module } from '@nestjs/common';
import { AsistenciacursoService } from './asistenciacurso.service';
import { AsistenciacursoController } from './asistenciacurso.controller';

@Module({
  controllers: [AsistenciacursoController],
  providers: [AsistenciacursoService]
})
export class AsistenciacursoModule {}
