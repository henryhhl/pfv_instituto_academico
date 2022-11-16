import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { Materia } from './entities/materia.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [MateriaController],
  providers: [MateriaService],
  imports: [
    TypeOrmModule.forFeature( [
      Materia,
    ] ),
    AuthModule,
  ],
})
export class MateriaModule {}
