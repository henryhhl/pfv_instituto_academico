import { Module } from '@nestjs/common';
import { GestionPeriodoService } from './gestionperiodo.service';
import { GestionPeriodoController } from './gestionperiodo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestionPeriodo } from './entities/gestionperiodo.entity';

@Module({
  controllers: [GestionPeriodoController],
  providers: [GestionPeriodoService],
  imports: [
    TypeOrmModule.forFeature( [
      GestionPeriodo
    ] ),
  ],
})
export class GestionPeriodoModule {}
