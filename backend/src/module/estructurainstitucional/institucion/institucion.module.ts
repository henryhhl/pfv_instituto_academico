import { Module } from '@nestjs/common';
import { InstitucionService } from './institucion.service';
import { InstitucionController } from './institucion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institucion } from './entities/institucion.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [InstitucionController],
  providers: [InstitucionService],
  imports: [
    TypeOrmModule.forFeature( [
      Institucion,
    ] ),
    AuthModule,
  ],
})
export class InstitucionModule {}
