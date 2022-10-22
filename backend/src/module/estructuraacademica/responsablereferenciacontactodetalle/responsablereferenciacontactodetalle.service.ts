import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ResponsableReferenciaContactoDetalle } from './entities/responsablereferenciacontactodetalle.entity';

@Injectable()
export class ResponsableReferenciaContactoDetalleService {
  private listResponsableReferenciaContactoDetalle: ResponsableReferenciaContactoDetalle[] = [];

  findAll() {
    return `This action returns all responsablereferenciacontactodetalle`;
  }
}
