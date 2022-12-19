import { Module } from '@nestjs/common';
import { GestionPeriodoService } from './gestionperiodo.service';
import { GestionPeriodoController } from './gestionperiodo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestionPeriodo } from './entities/gestionperiodo.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [GestionPeriodoController],
  providers: [GestionPeriodoService],
  exports: [GestionPeriodoService],
  imports: [
    TypeOrmModule.forFeature( [
      GestionPeriodo,
    ] ),
    AuthModule,
  ],
})
export class GestionPeriodoModule {}
