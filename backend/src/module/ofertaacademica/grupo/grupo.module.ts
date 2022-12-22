import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoService } from './grupo.service';
import { Grupo } from './entities/grupo.entity';
import { AuthModule } from '../../auth/auth.module';
import { GrupoController } from './grupo.controller';
import { GrupoPensumMateriaDetalle } from './entities/grupopensummateria.entity';

@Module({
  controllers: [GrupoController],
  providers: [GrupoService],
  exports: [GrupoService],
  imports: [
    TypeOrmModule.forFeature( [
      Grupo, GrupoPensumMateriaDetalle,
    ] ),
    AuthModule,
  ],
})
export class GrupoModule {}
