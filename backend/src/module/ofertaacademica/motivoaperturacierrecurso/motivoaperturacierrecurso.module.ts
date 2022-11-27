import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { MotivoAperturaCierreCursoService } from './motivoaperturacierrecurso.service';
import { MotivoAperturaCierreCurso } from './entities/motivoaperturacierrecurso.entity';
import { MotivoAperturaCierreCursoController } from './motivoaperturacierrecurso.controller';

@Module({
  controllers: [MotivoAperturaCierreCursoController],
  providers: [MotivoAperturaCierreCursoService],
  imports: [
    TypeOrmModule.forFeature( [
      MotivoAperturaCierreCurso,
    ] ),
    AuthModule,
  ],
})
export class MotivoAperturaCierreCursoModule {}
