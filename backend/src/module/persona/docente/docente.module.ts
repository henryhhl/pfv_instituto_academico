import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { DocenteReferenciaContactoDetalle } from './entities/docentereferenciacontacto.entity';
import { DocenteCiudadDetalle } from './entities/docenteciudaddetalle.entity';
import { DocenteMateriaDetalle } from './entities/docentemateriadetalle.entity';
import { DocenteCategoriaDocumentoDetalle } from './entities/docentecategoriadocumentodetalle.entity';

@Module({
  controllers: [DocenteController],
  providers: [DocenteService],
  imports: [
    TypeOrmModule.forFeature( [
      Docente, DocenteReferenciaContactoDetalle, DocenteCiudadDetalle,
      DocenteMateriaDetalle, DocenteCategoriaDocumentoDetalle,
    ] ),
  ],
})
export class DocenteModule {}
