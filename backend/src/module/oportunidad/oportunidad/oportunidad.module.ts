import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { OportunidadService } from './oportunidad.service';
import { Oportunidad } from './entities/oportunidad.entity';
import { OportunidadController } from './oportunidad.controller';
import { OportunidadTipoContactoDetalle } from './entities/oportunidadtipocontactodetalle.entity';
import { OportunidadTipoMedioPublicitarioDetalle } from './entities/oportunidadtipomediopublicitariodetalle.entity';

@Module({
  controllers: [OportunidadController],
  providers: [OportunidadService],
  imports: [
    TypeOrmModule.forFeature( [
      Oportunidad, OportunidadTipoContactoDetalle,
      OportunidadTipoMedioPublicitarioDetalle,
    ] ),
    AuthModule,
  ],
})
export class OportunidadModule {}
