import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { Materia } from './entities/materia.entity';

@Module({
  controllers: [MateriaController],
  providers: [MateriaService],
  imports: [
    TypeOrmModule.forFeature( [
      Materia
    ] ),
  ],
})
export class MateriaModule {}
