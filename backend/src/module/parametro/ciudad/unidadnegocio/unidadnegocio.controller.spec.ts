import { Test, TestingModule } from '@nestjs/testing';
import { UnidadnegocioController } from './unidadnegocio.controller';
import { UnidadnegocioService } from './unidadnegocio.service';

describe('UnidadnegocioController', () => {
  let controller: UnidadnegocioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadnegocioController],
      providers: [UnidadnegocioService],
    }).compile();

    controller = module.get<UnidadnegocioController>(UnidadnegocioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
