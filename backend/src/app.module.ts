import { Module } from '@nestjs/common';
import { TipoRolModule } from './tiporol/tiporol.module';

// nest g mo tiporol -> generar modulo
// nest g co tiporol -> generar controlador
// nest g s tiporol  -> generar servicio

@Module({
  imports: [TipoRolModule],
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule {}
