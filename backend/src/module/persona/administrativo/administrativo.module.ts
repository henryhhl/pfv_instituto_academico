import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativoService } from './administrativo.service';
import { AdministrativoController } from './administrativo.controller';
import { Administrativo } from './entities/administrativo.entity';
import { AdministrativoNacionalidadDetalle } from './entities/administrativociudaddetalle.entity';
import { AdministrativoReferenciaContactoDetalle } from './entities/administrativoreferenciacontacto.entity';
import { AdministrativoCategoriaDocumentoDetalle } from './entities/administrativocategoriadocumentodetalle.entity';

@Module({
  controllers: [AdministrativoController],
  providers: [AdministrativoService],
  imports: [
    TypeOrmModule.forFeature( [
      Administrativo, AdministrativoReferenciaContactoDetalle, AdministrativoNacionalidadDetalle,
      AdministrativoCategoriaDocumentoDetalle,
    ] ),
  ],
})
export class AdministrativoModule {}
