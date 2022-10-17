import { Test, TestingModule } from '@nestjs/testing';
import { UnidadacademicaService } from './unidadacademica.service';

describe('UnidadacademicaService', () => {
  let service: UnidadacademicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadacademicaService],
    }).compile();

    service = module.get<UnidadacademicaService>(UnidadacademicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
