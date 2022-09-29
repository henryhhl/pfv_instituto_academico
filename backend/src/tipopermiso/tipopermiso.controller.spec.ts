import { Test, TestingModule } from '@nestjs/testing';
import { TipopermisoController } from './tipopermiso.controller';

describe('TipopermisoController', () => {
  let controller: TipopermisoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipopermisoController],
    }).compile();

    controller = module.get<TipopermisoController>(TipopermisoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
