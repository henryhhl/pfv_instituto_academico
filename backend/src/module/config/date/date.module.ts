import { Module } from '@nestjs/common';
import { Dia } from './entities/dia.entity';
import { DateService } from './date.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateController } from './date.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [DateController],
  providers: [DateService],
  exports: [DateService],
  imports: [
    TypeOrmModule.forFeature( [
      Dia,
    ] ),
    AuthModule,
  ],
})
export class DateModule {}
