import { Test, TestingModule } from '@nestjs/testing';
import { ResponsableReferenciaContactoDetalleService } from './responsablereferenciacontactodetalle.service';

describe('ResponsablereferenciacontactodetalleService', () => {
  let service: ResponsableReferenciaContactoDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsableReferenciaContactoDetalleService],
    }).compile();

    service = module.get<ResponsableReferenciaContactoDetalleService>(ResponsableReferenciaContactoDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
