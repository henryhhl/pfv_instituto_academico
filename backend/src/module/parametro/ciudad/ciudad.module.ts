import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';

@Module({
  controllers: [CiudadController],
  providers: [CiudadService],
  imports: [
    TypeOrmModule.forFeature( [
      Ciudad
    ] ),
  ],
})
export class CiudadModule {}
