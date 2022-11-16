import { Module } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [PermisoController],
  providers: [PermisoService],
  exports: [PermisoService],
  imports: [
    TypeOrmModule.forFeature( [
      Permiso,
    ] ),
    AuthModule,
  ],
})
export class PermisoModule {}
