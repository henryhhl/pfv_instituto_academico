import { Module } from '@nestjs/common';
import { ResponsableReferenciaContactoDetalleService } from './responsablereferenciacontactodetalle.service';
import { ResponsableReferenciaContactoDetalleController } from './responsablereferenciacontactodetalle.controller';

@Module({
  controllers: [ResponsableReferenciaContactoDetalleController],
  providers: [ResponsableReferenciaContactoDetalleService]
})
export class ResponsablereferenciacontactodetalleModule {}
