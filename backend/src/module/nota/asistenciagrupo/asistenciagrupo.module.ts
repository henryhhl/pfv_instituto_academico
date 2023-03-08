import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { AsistenciagrupoService } from './asistenciagrupo.service';
import { AsistenciaGrupo } from './entities/asistenciagrupo.entity';
import { AsistenciagrupoController } from './asistenciagrupo.controller';

@Module({
  controllers: [AsistenciagrupoController],
  providers: [AsistenciagrupoService],
  exports: [AsistenciagrupoService],
  imports: [
    TypeOrmModule.forFeature( [
      AsistenciaGrupo,
    ] ),
    AuthModule,
  ],
})
export class AsistenciagrupoModule {}
