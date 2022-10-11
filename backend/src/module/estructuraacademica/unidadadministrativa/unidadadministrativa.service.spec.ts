import { Test, TestingModule } from '@nestjs/testing';
import { UnidadadministrativaService } from './unidadadministrativa.service';

describe('UnidadadministrativaService', () => {
  let service: UnidadadministrativaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadadministrativaService],
    }).compile();

    service = module.get<UnidadadministrativaService>(UnidadadministrativaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
