import { Test, TestingModule } from '@nestjs/testing';
import { TipoRolController } from './tiporol.controller';

describe('TipoRolController', () => {
  let controller: TipoRolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoRolController],
    }).compile();

    controller = module.get<TipoRolController>(TipoRolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
