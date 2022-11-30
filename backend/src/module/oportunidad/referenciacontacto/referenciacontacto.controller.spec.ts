import { Test, TestingModule } from '@nestjs/testing';
import { ReferenciaContactoController } from './referenciacontacto.controller';
import { ReferenciaContactoService } from './referenciacontacto.service';

describe('ReferenciaContactoController', () => {
  let controller: ReferenciaContactoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferenciaContactoController],
      providers: [ReferenciaContactoService],
    }).compile();

    controller = module.get<ReferenciaContactoController>(ReferenciaContactoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
