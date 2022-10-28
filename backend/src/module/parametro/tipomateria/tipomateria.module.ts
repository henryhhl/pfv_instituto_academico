import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMateriaService } from './tipomateria.service';
import { TipoMateriaController } from './tipomateria.controller';
import { TipoMateria } from './entities/tipomateria.entity';

@Module({
  controllers: [TipoMateriaController],
  providers: [TipoMateriaService],
  exports: [TipoMateriaService],
  imports: [
    TypeOrmModule.forFeature( [
      TipoMateria
    ] ),
  ],
})
export class TipoMateriaModule {}
