import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoService } from './periodo.service';
import { PeriodoController } from './periodo.controller';
import { Periodo } from './entities/periodo.entity';

@Module({
  controllers: [PeriodoController],
  providers: [PeriodoService],
  imports: [
    TypeOrmModule.forFeature( [
      Periodo
    ] ),
  ],
})
export class PeriodoModule {}
