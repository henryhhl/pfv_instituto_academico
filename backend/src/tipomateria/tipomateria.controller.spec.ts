import { Test, TestingModule } from '@nestjs/testing';
import { TipomateriaController } from './tipomateria.controller';
import { TipomateriaService } from './tipomateria.service';

describe('TipomateriaController', () => {
  let controller: TipomateriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipomateriaController],
      providers: [TipomateriaService],
    }).compile();

    controller = module.get<TipomateriaController>(TipomateriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
