import { Module } from '@nestjs/common';
import { NivelAcademicoService } from './nivelacademico.service';
import { NivelAcademicoController } from './nivelacademico.controller';

@Module({
  controllers: [NivelAcademicoController],
  providers: [NivelAcademicoService]
})
export class NivelacademicoModule {}
