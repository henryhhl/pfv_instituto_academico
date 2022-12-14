import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../seguridad/usuario/entities/usuario.entity';

// const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    AuthService, JwtStrategy,
    PassportModule, JwtModule,
  ],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature( [
      Usuario,
    ] ),
    PassportModule.register( {
      defaultStrategy: 'jwt',
    } ),
    JwtModule.registerAsync( {
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        return {
          secret: configService.get('JWT_SECRET') || 'E5T0EsUnCodigoS3CR3T0',
          signOptions: {
            expiresIn: '8h',
          },
        };
      },
    } ),
    // JwtModule.register( {
    //   secret: process.env.JWT_SECRET || 'E5T0EsUnCodigoS3CR3T0',
    //   signOptions: {
    //     expiresIn: '1h',
    //   },
    // } ),
  ],
})
export class AuthModule {}
