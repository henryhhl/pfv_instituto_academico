
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaAcademicaService } from './ofertaacademica.service';
import { OfertaAcademicaController } from './ofertaacademica.controller';
import { OfertaAcademica } from './entities/ofertaacademica.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [OfertaAcademicaController],
  providers: [OfertaAcademicaService],
  imports: [
    TypeOrmModule.forFeature( [
      OfertaAcademica,
    ] ),
    AuthModule,
  ],
})
export class OfertaAcademicaModule {}
