
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenciaContactoService } from './referenciacontacto.service';
import { ReferenciaContactoController } from './referenciacontacto.controller';
import { ReferenciaContacto } from './entities/referenciacontacto.entity';

@Module({
  controllers: [
    ReferenciaContactoController
  ],
  providers: [
    ReferenciaContactoService
  ],
  imports: [
    TypeOrmModule.forFeature( [
      ReferenciaContacto
    ] ),
  ],
})
export class ReferenciaContactoModule {}
