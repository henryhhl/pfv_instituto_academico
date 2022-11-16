import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AulaService } from './aula.service';
import { AulaController } from './aula.controller';
import { Aula } from './entities/aula.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [AulaController],
  providers: [AulaService],
  imports: [
    TypeOrmModule.forFeature( [
      Aula,
    ] ),
    AuthModule,
  ],
})
export class AulaModule {}
