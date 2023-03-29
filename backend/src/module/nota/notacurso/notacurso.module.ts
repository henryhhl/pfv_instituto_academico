import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { NotacursoService } from './notacurso.service';
import { NotaCurso } from './entities/notacurso.entity';
import { NotacursoController } from './notacurso.controller';

@Module({
  controllers: [NotacursoController],
  providers: [NotacursoService],
  exports: [NotacursoService],
  imports: [
    TypeOrmModule.forFeature( [
      NotaCurso,
    ] ),
    AuthModule,
  ],
})
export class NotacursoModule {}
