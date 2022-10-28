import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PensumService } from './pensum.service';
import { PensumController } from './pensum.controller';
import { Pensum } from './entities/pensum.entity';

@Module({
  controllers: [PensumController],
  providers: [PensumService],
  imports: [
    TypeOrmModule.forFeature( [
      Pensum
    ] ),
  ],
})
export class PensumModule {}
