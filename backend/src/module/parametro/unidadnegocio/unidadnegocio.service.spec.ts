import { Test, TestingModule } from '@nestjs/testing';
import { UnidadnegocioService } from './unidadnegocio.service';

describe('UnidadnegocioService', () => {
  let service: UnidadnegocioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadnegocioService],
    }).compile();

    service = module.get<UnidadnegocioService>(UnidadnegocioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
