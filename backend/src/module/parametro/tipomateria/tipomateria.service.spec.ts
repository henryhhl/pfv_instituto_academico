import { Test, TestingModule } from '@nestjs/testing';
import { TipomateriaService } from './tipomateria.service';

describe('TipomateriaService', () => {
  let service: TipomateriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipomateriaService],
    }).compile();

    service = module.get<TipomateriaService>(TipomateriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
