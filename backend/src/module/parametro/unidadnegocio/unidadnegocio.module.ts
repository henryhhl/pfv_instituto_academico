import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadNegocioService } from './unidadnegocio.service';
import { UnidadNegocioController } from './unidadnegocio.controller';
import { UnidadNegocio } from './entities/unidadnegocio.entity';

@Module({
  controllers: [UnidadNegocioController],
  providers: [UnidadNegocioService],
  imports: [
    TypeOrmModule.forFeature( [
      UnidadNegocio
    ] ),
  ],
})
export class UnidadNegocioModule {}
