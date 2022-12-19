import { Module } from '@nestjs/common';
import { InscripciongrupoService } from './inscripciongrupo.service';
import { InscripciongrupoController } from './inscripciongrupo.controller';

@Module({
  controllers: [InscripciongrupoController],
  providers: [InscripciongrupoService]
})
export class InscripciongrupoModule {}
