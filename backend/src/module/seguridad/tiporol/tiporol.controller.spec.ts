import { Test, TestingModule } from '@nestjs/testing';
import { TiporolController } from './tiporol.controller';

describe('TiporolController', () => {
  let controller: TiporolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiporolController],
    }).compile();

    controller = module.get<TiporolController>(TiporolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
