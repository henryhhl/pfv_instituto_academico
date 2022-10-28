import { Module } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';

@Module({
  controllers: [PermisoController],
  providers: [PermisoService],
  exports: [PermisoService],
  imports: [
    TypeOrmModule.forFeature( [
      Permiso
    ] ),
  ],
})
export class PermisoModule {}
