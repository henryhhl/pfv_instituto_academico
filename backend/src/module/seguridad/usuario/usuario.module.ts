import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature( [
      Usuario,
    ] ),
  ],
})
export class UsuarioModule {}
