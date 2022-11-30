import { Test, TestingModule } from '@nestjs/testing';
import { TipoMedioPublicitarioController } from './tipomediopublicitario.controller';
import { TipoMedioPublicitarioService } from './tipomediopublicitario.service';

describe('TipoMedioPublicitarioController', () => {
  let controller: TipoMedioPublicitarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoMedioPublicitarioController],
      providers: [TipoMedioPublicitarioService],
    }).compile();

    controller = module.get<TipoMedioPublicitarioController>(TipoMedioPublicitarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
