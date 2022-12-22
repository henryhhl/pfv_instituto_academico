import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaService } from './materia.service';
import { Materia } from './entities/materia.entity';
import { AuthModule } from '../../auth/auth.module';
import { MateriaController } from './materia.controller';

@Module({
  controllers: [MateriaController],
  providers: [MateriaService],
  exports: [MateriaService],
  imports: [
    TypeOrmModule.forFeature( [
      Materia,
    ] ),
    AuthModule,
  ],
})
export class MateriaModule {}
