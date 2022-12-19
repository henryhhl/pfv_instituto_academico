import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadAdministrativaService } from './unidadadministrativa.service';
import { UnidadAdministrativaController } from './unidadadministrativa.controller';
import { UnidadAdministrativa } from './entities/unidadadministrativa.entity';
import { UnidadAdministrativaTurnoDetalle } from './entities/unidadadministrativaturnodetalle.entity';
import { UnidadAdministrativaAulaDetalle } from './entities/unidadadministrativaauladetalle.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [UnidadAdministrativaController],
  providers: [UnidadAdministrativaService],
  exports: [UnidadAdministrativaService],
  imports: [
    TypeOrmModule.forFeature( [
      UnidadAdministrativa, UnidadAdministrativaTurnoDetalle,
      UnidadAdministrativaAulaDetalle,
    ] ),
    AuthModule,
  ],
})
export class UnidadAdministrativaModule {}
