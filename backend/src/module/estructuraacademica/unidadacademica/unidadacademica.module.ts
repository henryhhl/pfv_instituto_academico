import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadacademicaService } from './unidadacademica.service';
import { UnidadacademicaController } from './unidadacademica.controller';
import { UnidadAcademica } from './entities/unidadacademica.entity';

@Module({
  controllers: [UnidadacademicaController],
  providers: [UnidadacademicaService],
  imports: [
    TypeOrmModule.forFeature( [
      UnidadAcademica
    ] ),
  ],
})
export class UnidadacademicaModule {}
