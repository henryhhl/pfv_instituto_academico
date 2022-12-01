import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegocioService } from './negocio.service';
import { AuthModule } from '../../auth/auth.module';
import { Negocio } from './entities/negocio.entity';
import { NegocioController } from './negocio.controller';

@Module({
  controllers: [NegocioController],
  providers: [NegocioService],
  imports: [
    TypeOrmModule.forFeature( [
      Negocio,
    ] ),
    AuthModule,
  ],
})
export class NegocioModule {}
