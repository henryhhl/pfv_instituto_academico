import { Module } from '@nestjs/common';
import { ReferenciaContactoService } from './referenciacontacto.service';
import { ReferenciaContactoController } from './referenciacontacto.controller';

@Module({
  controllers: [ReferenciaContactoController],
  providers: [ReferenciaContactoService]
})
export class ReferenciaContactoModule {}
