import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../seguridad/usuario/usuario.module';
import { Usuario } from '../seguridad/usuario/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    UsuarioModule,
    TypeOrmModule.forFeature( [
      Usuario,
    ] ),
    PassportModule.register( {
      defaultStrategy: 'jwt',
    } ),
    JwtModule.register( {
      secret: process.env.JWT_SECRET || 'E5T0EsUnCodigoS3CR3T0',
      signOptions: {
        expiresIn: '1h',
      },
    } ),
  ],
})
export class AuthModule {}
