import { Test, TestingModule } from '@nestjs/testing';
import { TipoMedioPublicitarioService } from './tipomediopublicitario.service';

describe('TipoMedioPublicitarioService', () => {
  let service: TipoMedioPublicitarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoMedioPublicitarioService],
    }).compile();

    service = module.get<TipoMedioPublicitarioService>(TipoMedioPublicitarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
