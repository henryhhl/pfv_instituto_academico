import { Module } from '@nestjs/common';
import { TipoRolController } from './tiporol.controller';
import { TipoRolService } from './tiporol.service';

@Module({
  controllers: [TipoRolController],
  providers: [TipoRolService],
})
export class TipoRolModule {}
