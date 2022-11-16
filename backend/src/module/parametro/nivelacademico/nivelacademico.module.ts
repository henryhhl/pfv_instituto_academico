import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelAcademicoService } from './nivelacademico.service';
import { NivelAcademicoController } from './nivelacademico.controller';
import { NivelAcademico } from './entities/nivelacademico.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [NivelAcademicoController],
  providers: [NivelAcademicoService],
  imports: [
    TypeOrmModule.forFeature( [
      NivelAcademico,
    ] ),
    AuthModule,
  ],
})
export class NivelAcademicoModule {}
