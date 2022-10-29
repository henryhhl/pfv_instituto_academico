import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';

@Module({
  controllers: [TurnoController],
  providers: [TurnoService],
  imports: [
    TypeOrmModule.forFeature( [
      Turno
    ] ),
  ],
})
export class TurnoModule {}
