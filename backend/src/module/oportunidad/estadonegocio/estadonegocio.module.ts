import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { EstadoNegocioService } from './estadonegocio.service';
import { EstadoNegocio } from './entities/estadonegocio.entity';
import { EstadoNegocioController } from './estadonegocio.controller';

@Module({
  controllers: [EstadoNegocioController],
  providers: [EstadoNegocioService],
  imports: [
    TypeOrmModule.forFeature( [
      EstadoNegocio,
    ] ),
    AuthModule,
  ],
})
export class EstadoNegocioModule {}
