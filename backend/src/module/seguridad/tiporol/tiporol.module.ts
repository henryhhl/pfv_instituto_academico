import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoRol } from './entities/tipoRol.entity';
import { TipoRolController } from './tiporol.controller';
import { TipoRolService } from './tiporol.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [TipoRolController],
  providers: [TipoRolService],
  exports: [TipoRolService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature( [
      TipoRol,
    ] ),
  ],
})
export class TipoRolModule {}
