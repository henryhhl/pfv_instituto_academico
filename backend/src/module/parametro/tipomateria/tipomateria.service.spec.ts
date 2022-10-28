import { Test, TestingModule } from '@nestjs/testing';
import { TipoMateriaService } from './tipomateria.service';

describe('TipoMateriaService', () => {
  let service: TipoMateriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoMateriaService],
    }).compile();

    service = module.get<TipoMateriaService>(TipoMateriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
