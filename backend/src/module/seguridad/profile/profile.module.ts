import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { AuthModule } from '../../auth/auth.module';
import { Profile } from './entities/profile.entity';
import { ProfileController } from './profile.controller';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
  imports: [
    UsuarioModule,
    AuthModule,
    TypeOrmModule.forFeature( [
      Profile,
    ] ),
  ],
})
export class ProfileModule {}
