import { Module } from '@nestjs/common';
import { TipoCiudadService } from './tipociudad.service';
import { TipoCiudadController } from './tipociudad.controller';

@Module({
  controllers: [TipoCiudadController],
  providers: [TipoCiudadService]
})
export class TipoCiudadModule {}
