import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignarRolService } from './asignarrol.service';
import { AsignarRol } from './entities/asignarrol.entity';
import { AsignarRolController } from './asignarrol.controller';
import { RolModule } from '../rol/rol.module';
import { AuthModule } from '../../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [AsignarRolController],
  providers: [AsignarRolService],
  exports: [AsignarRolService],
  imports: [
    UsuarioModule,
    AuthModule,
    RolModule,
    TypeOrmModule.forFeature( [
      AsignarRol,
    ] ),
  ],
})
export class AsignarrolModule {}
