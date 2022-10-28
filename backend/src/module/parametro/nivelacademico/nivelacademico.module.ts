import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelAcademicoService } from './nivelacademico.service';
import { NivelAcademicoController } from './nivelacademico.controller';
import { NivelAcademico } from './entities/nivelacademico.entity';

@Module({
  controllers: [NivelAcademicoController],
  providers: [NivelAcademicoService],
  imports: [
    TypeOrmModule.forFeature( [
      NivelAcademico
    ] ),
  ],
})
export class NivelAcademicoModule {}
