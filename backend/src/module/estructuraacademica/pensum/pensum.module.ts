import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PensumService } from './pensum.service';
import { PensumController } from './pensum.controller';
import { Pensum } from './entities/pensum.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [PensumController],
  providers: [PensumService],
  imports: [
    TypeOrmModule.forFeature( [
      Pensum
    ] ),
    AuthModule,
  ],
})
export class PensumModule {}
