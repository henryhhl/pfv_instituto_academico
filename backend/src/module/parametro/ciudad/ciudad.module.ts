import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [CiudadController],
  providers: [CiudadService],
  imports: [
    TypeOrmModule.forFeature( [
      Ciudad,
    ] ),
    AuthModule,
  ],
})
export class CiudadModule {}
