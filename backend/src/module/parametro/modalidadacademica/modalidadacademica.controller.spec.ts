import { Test, TestingModule } from '@nestjs/testing';
import { ModalidadAcademicaController } from './modalidadacademica.controller';
import { ModalidadAcademicaService } from './modalidadacademica.service';

describe('ModalidadAcademicaController', () => {
  let controller: ModalidadAcademicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModalidadAcademicaController],
      providers: [ModalidadAcademicaService],
    }).compile();

    controller = module.get<ModalidadAcademicaController>(ModalidadAcademicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
