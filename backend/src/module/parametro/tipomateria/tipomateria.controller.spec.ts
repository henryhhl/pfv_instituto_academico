import { Test, TestingModule } from '@nestjs/testing';
import { TipoMateriaController } from './tipomateria.controller';
import { TipoMateriaService } from './tipomateria.service';

describe('TipomateriaController', () => {
  let controller: TipoMateriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoMateriaController],
      providers: [TipoMateriaService],
    }).compile();

    controller = module.get<TipoMateriaController>(TipoMateriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
