import { Test, TestingModule } from '@nestjs/testing';
import { TipoResultadoController } from './tiporesultado.controller';
import { TipoResultadoService } from './tiporesultado.service';

describe('TipoResultadoController', () => {
  let controller: TipoResultadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoResultadoController],
      providers: [TipoResultadoService],
    }).compile();

    controller = module.get<TipoResultadoController>(TipoResultadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
