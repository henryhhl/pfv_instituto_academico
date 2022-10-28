import { Test, TestingModule } from '@nestjs/testing';
import { TipoPermisoController } from './tipopermiso.controller';

describe('TipoPermisoController', () => {
  let controller: TipoPermisoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoPermisoController],
    }).compile();

    controller = module.get<TipoPermisoController>(TipoPermisoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
