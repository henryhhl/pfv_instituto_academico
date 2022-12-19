import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadNegocioService } from './unidadnegocio.service';
import { UnidadNegocioController } from './unidadnegocio.controller';
import { UnidadNegocio } from './entities/unidadnegocio.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [UnidadNegocioController],
  providers: [UnidadNegocioService],
  exports: [UnidadNegocioService],
  imports: [
    TypeOrmModule.forFeature( [
      UnidadNegocio,
    ] ),
    AuthModule,
  ],
})
export class UnidadNegocioModule {}
