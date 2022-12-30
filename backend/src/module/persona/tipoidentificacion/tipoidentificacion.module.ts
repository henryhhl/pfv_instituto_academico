import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { TipoIdentificacionService } from './tipoidentificacion.service';
import { TipoIdentificacion } from './entities/tipoidentificacion.entity';
import { BitacoraModule } from '../../seguridad/bitacora/bitacora.module';
import { TipoIdentificacionController } from './tipoidentificacion.controller';

@Module({
  controllers: [TipoIdentificacionController],
  providers: [TipoIdentificacionService],
  imports: [
    TypeOrmModule.forFeature( [
      TipoIdentificacion
    ] ),
    AuthModule,
    BitacoraModule,
  ],
})
export class TipoIdentificacionModule {}
