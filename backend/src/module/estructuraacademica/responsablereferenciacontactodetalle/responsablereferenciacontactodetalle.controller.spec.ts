import { Test, TestingModule } from '@nestjs/testing';
import { ResponsableReferenciaContactoDetalleController } from './responsablereferenciacontactodetalle.controller';
import { ResponsableReferenciaContactoDetalleService } from './responsablereferenciacontactodetalle.service';

describe('ResponsablereferenciacontactodetalleController', () => {
  let controller: ResponsableReferenciaContactoDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsableReferenciaContactoDetalleController],
      providers: [ResponsableReferenciaContactoDetalleService],
    }).compile();

    controller = module.get<ResponsableReferenciaContactoDetalleController>(ResponsableReferenciaContactoDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
