import { Module } from '@nestjs/common';
import { UnidadNegocioService } from './unidadnegocio.service';
import { UnidadNegocioController } from './unidadnegocio.controller';

@Module({
  controllers: [UnidadNegocioController],
  providers: [UnidadNegocioService]
})
export class UnidadNegocioModule {}
