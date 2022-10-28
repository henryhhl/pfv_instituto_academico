import { Test, TestingModule } from '@nestjs/testing';
import { UnidadAdministrativaController } from './unidadadministrativa.controller';
import { UnidadAdministrativaService } from './unidadadministrativa.service';

describe('UnidadAdministrativaController', () => {
  let controller: UnidadAdministrativaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadAdministrativaController],
      providers: [UnidadAdministrativaService],
    }).compile();

    controller = module.get<UnidadAdministrativaController>(UnidadAdministrativaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
