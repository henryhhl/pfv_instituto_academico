
import { Controller, Get } from '@nestjs/common';
import { ResponsableReferenciaContactoDetalleService } from './responsablereferenciacontactodetalle.service';

@Controller('responsablereferenciacontactodetalle')
export class ResponsableReferenciaContactoDetalleController {
  constructor(private readonly responsablereferenciacontactodetalleService: ResponsableReferenciaContactoDetalleService) {}

  @Get()
  findAll() {
    return this.responsablereferenciacontactodetalleService.findAll();
  }
}
