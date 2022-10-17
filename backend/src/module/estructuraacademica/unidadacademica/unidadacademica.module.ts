import { Module } from '@nestjs/common';
import { UnidadacademicaService } from './unidadacademica.service';
import { UnidadacademicaController } from './unidadacademica.controller';

@Module({
  controllers: [UnidadacademicaController],
  providers: [UnidadacademicaService]
})
export class UnidadacademicaModule {}
