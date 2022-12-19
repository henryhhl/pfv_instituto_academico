import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadacademicaService } from './unidadacademica.service';
import { UnidadacademicaController } from './unidadacademica.controller';
import { UnidadAcademica } from './entities/unidadacademica.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [UnidadacademicaController],
  providers: [UnidadacademicaService],
  exports: [UnidadacademicaService],
  imports: [
    TypeOrmModule.forFeature( [
      UnidadAcademica
    ] ),
    AuthModule,
  ],
})
export class UnidadacademicaModule {}
