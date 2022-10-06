import { Test, TestingModule } from '@nestjs/testing';
import { ModalidadacademicaController } from './modalidadacademica.controller';
import { ModalidadacademicaService } from './modalidadacademica.service';

describe('ModalidadacademicaController', () => {
  let controller: ModalidadacademicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModalidadacademicaController],
      providers: [ModalidadacademicaService],
    }).compile();

    controller = module.get<ModalidadacademicaController>(ModalidadacademicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
