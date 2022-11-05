import { Module } from '@nestjs/common';
import { AdministrativoService } from './administrativo.service';
import { AdministrativoController } from './administrativo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrativo } from './entities/administrativo.entity';
import { AdministrativoReferenciaContactoDetalle } from './entities/administrativoreferenciacontacto.entity';
import { AdministrativoNacionalidadDetalle } from './entities/administrativociudaddetalle.entity';

@Module({
  controllers: [AdministrativoController],
  providers: [AdministrativoService],
  imports: [
    TypeOrmModule.forFeature( [
      Administrativo, AdministrativoReferenciaContactoDetalle, AdministrativoNacionalidadDetalle,
    ] ),
  ],
})
export class AdministrativoModule {}
