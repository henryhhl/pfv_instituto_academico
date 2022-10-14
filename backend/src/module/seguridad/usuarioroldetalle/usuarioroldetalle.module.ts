import { Module } from '@nestjs/common';
import { UsuarioRolDetalleService } from './usuarioroldetalle.service';
import { UsuarioRolDetalleController } from './usuarioroldetalle.controller';
import { RolModule } from '../../../rol/rol.module';
import { UsuarioModule } from '../../../usuario/usuario.module';

@Module({
  controllers: [UsuarioRolDetalleController],
  providers: [UsuarioRolDetalleService],
  imports: [RolModule, UsuarioModule,],
})
export class UsuarioRolDetalleModule {}
