import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService],
  imports: [
    TypeOrmModule.forFeature( [
      Rol,
    ] ),
    AuthModule,
  ],
})
export class RolModule {}
