import { Test, TestingModule } from '@nestjs/testing';
import { TipoResultadoService } from './tiporesultado.service';

describe('TipoResultadoService', () => {
  let service: TipoResultadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoResultadoService],
    }).compile();

    service = module.get<TipoResultadoService>(TipoResultadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
