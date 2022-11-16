import { Module } from '@nestjs/common';
import { TipoIdentificacionService } from './tipoidentificacion.service';
import { TipoIdentificacionController } from './tipoidentificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoIdentificacion } from './entities/tipoidentificacion.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [TipoIdentificacionController],
  providers: [TipoIdentificacionService],
  imports: [
    TypeOrmModule.forFeature( [
      TipoIdentificacion
    ] ),
    AuthModule,
  ],
})
export class TipoIdentificacionModule {}
