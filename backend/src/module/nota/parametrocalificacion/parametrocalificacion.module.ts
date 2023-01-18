import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { ParametroCalificacionService } from './parametrocalificacion.service';
import { ParametroCalificacion } from './entities/parametrocalificacion.entity';
import { ParametroCalificacionController } from './parametrocalificacion.controller';

@Module({
  controllers: [ParametroCalificacionController],
  providers: [ParametroCalificacionService],
  exports: [ParametroCalificacionService],
  imports: [
    TypeOrmModule.forFeature( [
      ParametroCalificacion,
    ] ),
    AuthModule,
  ],
})
export class ParametroCalificacionModule {}
