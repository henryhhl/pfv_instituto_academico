import { Test, TestingModule } from '@nestjs/testing';
import { UnidadadministrativaController } from './unidadadministrativa.controller';
import { UnidadadministrativaService } from './unidadadministrativa.service';

describe('UnidadadministrativaController', () => {
  let controller: UnidadadministrativaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadadministrativaController],
      providers: [UnidadadministrativaService],
    }).compile();

    controller = module.get<UnidadadministrativaController>(UnidadadministrativaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
