import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './entities/estudiante.entity';
import { EstudianteController } from './estudiante.controller';
import { BitacoraModule } from '../../seguridad/bitacora/bitacora.module';
import { EstudianteCiudadDetalle } from './entities/estudianteciudaddetalle.entity';
import { EstudianteFamiliarDetalle } from './entities/estudiantefamiliardetalle.entity';
import { EstudianteCategoriaDocumentoDetalle } from './entities/estudiantecategoriadocumentodetalle.entity';

@Module({
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [EstudianteService],
  imports: [
    TypeOrmModule.forFeature( [
      Estudiante, EstudianteCategoriaDocumentoDetalle,
      EstudianteCiudadDetalle, EstudianteFamiliarDetalle,
    ] ),
    AuthModule,
    BitacoraModule,
  ],
})
export class EstudianteModule {}
