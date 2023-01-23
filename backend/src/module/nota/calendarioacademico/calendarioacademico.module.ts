import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { BitacoraModule } from '../../seguridad/bitacora/bitacora.module';
import { CalendarioAcademicoService } from './calendarioacademico.service';
import { CalendarioAcademico } from './entities/calendarioacademico.entity';
import { CalendarioAcademicoController } from './calendarioacademico.controller';
import { GestionPeriodoModule } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.module';
import { UnidadAdministrativaModule } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.module';

@Module({
  controllers: [CalendarioAcademicoController],
  providers: [CalendarioAcademicoService],
  exports: [CalendarioAcademicoService],
  imports: [
    TypeOrmModule.forFeature( [
      CalendarioAcademico,
    ] ),
    AuthModule,
    BitacoraModule,
    UnidadAdministrativaModule,
    GestionPeriodoModule,
  ],
})
export class CalendarioacademicoModule {}
