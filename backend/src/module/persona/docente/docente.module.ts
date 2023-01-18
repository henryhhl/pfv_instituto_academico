import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocenteService } from './docente.service';
import { Docente } from './entities/docente.entity';
import { AuthModule } from '../../auth/auth.module';
import { DocenteController } from './docente.controller';
import { BitacoraModule } from '../../seguridad/bitacora/bitacora.module';
import { DocenteCiudadDetalle } from './entities/docenteciudaddetalle.entity';
import { DocenteEstudioDetalle } from './entities/docenteestudiodetalle.entity';
import { DocenteMateriaDetalle } from './entities/docentemateriadetalle.entity';
import { DocenteReferenciaContactoDetalle } from './entities/docentereferenciacontacto.entity';
import { DocenteCategoriaDocumentoDetalle } from './entities/docentecategoriadocumentodetalle.entity';

@Module({
  controllers: [DocenteController],
  providers: [DocenteService],
  exports: [DocenteService],
  imports: [
    TypeOrmModule.forFeature( [
      Docente, DocenteReferenciaContactoDetalle, DocenteCiudadDetalle,
      DocenteMateriaDetalle, DocenteCategoriaDocumentoDetalle,
      DocenteEstudioDetalle,
    ] ),
    AuthModule,
    BitacoraModule,
  ],
})
export class DocenteModule {}
