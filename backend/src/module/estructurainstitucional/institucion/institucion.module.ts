import { Module } from '@nestjs/common';
import { InstitucionService } from './institucion.service';
import { InstitucionController } from './institucion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institucion } from './entities/institucion.entity';

@Module({
  controllers: [InstitucionController],
  providers: [InstitucionService],
  imports: [
    TypeOrmModule.forFeature( [
      Institucion
    ] ),
  ],
})
export class InstitucionModule {}
