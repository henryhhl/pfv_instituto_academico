import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [TurnoController],
  providers: [TurnoService],
  exports: [TurnoService],
  imports: [
    TypeOrmModule.forFeature( [
      Turno,
    ] ),
    AuthModule,
  ],
})
export class TurnoModule {}
