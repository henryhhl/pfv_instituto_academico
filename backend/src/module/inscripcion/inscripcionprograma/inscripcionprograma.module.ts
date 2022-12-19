import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { InscripcionProgramaService } from './inscripcionprograma.service';
import { InscripcionPrograma } from './entities/inscripcionprograma.entity';
import { InscripcionProgramaController } from './inscripcionprograma.controller';
import { PensumModule } from '../../estructuraacademica/pensum/pensum.module';
import { EstudianteModule } from '../../persona/estudiante/estudiante.module';
import { ProgramaModule } from '../../estructuraacademica/programa/programa.module';
import { UnidadNegocioModule } from '../../parametro/unidadnegocio/unidadnegocio.module';
import { UnidadacademicaModule } from '../../estructuraacademica/unidadacademica/unidadacademica.module';
import { GestionPeriodoModule } from '../../estructurainstitucional/gestionperiodo/gestionperiodo.module';
import { UnidadAdministrativaModule } from '../../estructuraacademica/unidadadministrativa/unidadadministrativa.module';
import { ModalidadAcademicaModule } from '../../parametro/modalidadacademica/modalidadacademica.module';

@Module({
  controllers: [InscripcionProgramaController],
  providers: [InscripcionProgramaService],
  imports: [
    TypeOrmModule.forFeature( [
      InscripcionPrograma,
    ] ),
    AuthModule,
    UnidadAdministrativaModule,
    ModalidadAcademicaModule,
    UnidadacademicaModule,
    GestionPeriodoModule,
    UnidadNegocioModule,
    EstudianteModule,
    ProgramaModule,
    PensumModule,
  ],
})
export class InscripcionProgramaModule {}
