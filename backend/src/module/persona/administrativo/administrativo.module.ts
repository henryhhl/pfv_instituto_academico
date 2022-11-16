import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { AdministrativoService } from './administrativo.service';
import { Administrativo } from './entities/administrativo.entity';
import { AdministrativoController } from './administrativo.controller';
import { AdministrativoEstudioDetalle } from './entities/administrativoestudiodetalle.entity';
import { AdministrativoNacionalidadDetalle } from './entities/administrativociudaddetalle.entity';
import { AdministrativoReferenciaContactoDetalle } from './entities/administrativoreferenciacontacto.entity';
import { AdministrativoCategoriaDocumentoDetalle } from './entities/administrativocategoriadocumentodetalle.entity';

@Module({
  controllers: [AdministrativoController],
  providers: [AdministrativoService],
  imports: [
    TypeOrmModule.forFeature( [
      Administrativo, AdministrativoReferenciaContactoDetalle, AdministrativoNacionalidadDetalle,
      AdministrativoCategoriaDocumentoDetalle, AdministrativoEstudioDetalle,
    ] ),
    AuthModule,
  ],
})
export class AdministrativoModule {}
