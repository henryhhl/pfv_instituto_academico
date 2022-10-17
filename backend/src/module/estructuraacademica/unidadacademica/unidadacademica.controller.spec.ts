import { Test, TestingModule } from '@nestjs/testing';
import { UnidadacademicaController } from './unidadacademica.controller';
import { UnidadacademicaService } from './unidadacademica.service';

describe('UnidadacademicaController', () => {
  let controller: UnidadacademicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadacademicaController],
      providers: [UnidadacademicaService],
    }).compile();

    controller = module.get<UnidadacademicaController>(UnidadacademicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
