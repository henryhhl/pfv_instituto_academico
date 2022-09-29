import { Module } from '@nestjs/common';
import { TipoMateriaService } from './tipomateria.service';
import { TipoMateriaController } from './tipomateria.controller';

@Module({
  controllers: [TipoMateriaController],
  providers: [TipoMateriaService],
  exports: [TipoMateriaService],
})
export class TipoMateriaModule {}
