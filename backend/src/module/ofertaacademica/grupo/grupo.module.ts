import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoService } from './grupo.service';
import { AuthModule } from '../../auth/auth.module';
import { GrupoController } from './grupo.controller';
import { Grupo } from './entities/grupo.entity';
import { GrupoMateriaDetalle } from './entities/grupomateriadetalle.entity';
import { GrupoMateriaDiaDetalle } from './entities/grupomateriadiadetalle.entity';
import { GrupoMateriaDiaHorarioDetalle } from './entities/grupomateriadiahorario.entity';
import { GrupoMateriaCalificacionDetalle } from './entities/grupomateriacalificacion.entity';
import { DateModule } from '../../config/date/date.module';
import { DocenteModule } from '../../persona/docente/docente.module';
import { MateriaModule } from '../../parametro/materia/materia.module';
import { AulaModule } from '../../estructurainstitucional/aula/aula.module';
import { PensumModule } from '../../estructuraacademica/pensum/pensum.module';
import { TurnoModule } from '../../estructurainstitucional/turno/turno.module';
import { ProgramaModule } from '../../estructuraacademica/programa/programa.module';
import { UnidadNegocioModule } from '../../parametro/unidadnegocio/unidadnegocio.module';
import { UnidadacademicaModule } from '../../estructuraacademica/unidadacademica/unidadacademica.module';
import { GestionPeriodoModule } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.module';
import { ParametroCalificacionModule } from '../../nota/parametrocalificacion/parametrocalificacion.module';
import { DivisionAcademicaModule } from '../../estructurainstitucional/divisionacademica/divisionacademica.module';
import { UnidadAdministrativaModule } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.module';

@Module({
  controllers: [GrupoController],
  providers: [GrupoService],
  exports: [GrupoService],
  imports: [
    TypeOrmModule.forFeature( [
      Grupo, GrupoMateriaDetalle, 
      GrupoMateriaDiaDetalle, GrupoMateriaDiaHorarioDetalle,
      GrupoMateriaCalificacionDetalle,
    ] ),
    AuthModule,
    AulaModule,
    DateModule,
    UnidadAdministrativaModule,
    UnidadNegocioModule,
    UnidadacademicaModule,
    ProgramaModule,
    PensumModule,
    DocenteModule,
    DivisionAcademicaModule,
    TurnoModule,
    GestionPeriodoModule,
    MateriaModule,
    ParametroCalificacionModule,
  ],
})
export class GrupoModule {}
