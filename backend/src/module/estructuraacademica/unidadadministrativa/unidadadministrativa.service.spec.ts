import { Test, TestingModule } from '@nestjs/testing';
import { UnidadAdministrativaService } from './unidadadministrativa.service';

describe('UnidadAdministrativaService', () => {
  let service: UnidadAdministrativaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadAdministrativaService],
    }).compile();

    service = module.get<UnidadAdministrativaService>(UnidadAdministrativaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
