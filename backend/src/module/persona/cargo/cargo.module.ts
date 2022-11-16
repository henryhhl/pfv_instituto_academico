import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { AuthModule } from '../../auth/auth.module';
import { CargoController } from './cargo.controller';

@Module({
  controllers: [CargoController],
  providers: [CargoService],
  imports: [
    TypeOrmModule.forFeature( [
      Cargo
    ] ),
    AuthModule,
  ],
})
export class CargoModule {}
