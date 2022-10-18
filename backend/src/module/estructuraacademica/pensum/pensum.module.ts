import { Module } from '@nestjs/common';
import { PensumService } from './pensum.service';
import { PensumController } from './pensum.controller';

@Module({
  controllers: [PensumController],
  providers: [PensumService]
})
export class PensumModule {}
