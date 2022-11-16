import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { Docente } from './entities/docente.entity';
import { DocenteCiudadDetalle } from './entities/docenteciudaddetalle.entity';
import { DocenteEstudioDetalle } from './entities/docenteestudiodetalle.entity';
import { DocenteMateriaDetalle } from './entities/docentemateriadetalle.entity';
import { DocenteReferenciaContactoDetalle } from './entities/docentereferenciacontacto.entity';
import { DocenteCategoriaDocumentoDetalle } from './entities/docentecategoriadocumentodetalle.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [DocenteController],
  providers: [DocenteService],
  imports: [
    TypeOrmModule.forFeature( [
      Docente, DocenteReferenciaContactoDetalle, DocenteCiudadDetalle,
      DocenteMateriaDetalle, DocenteCategoriaDocumentoDetalle,
      DocenteEstudioDetalle,
    ] ),
    AuthModule,
  ],
})
export class DocenteModule {}
