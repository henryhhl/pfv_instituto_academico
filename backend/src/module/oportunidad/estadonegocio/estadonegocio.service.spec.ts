import { Test, TestingModule } from '@nestjs/testing';
import { EstadoNegocioService } from './estadonegocio.service';

describe('EstadoNegocioService', () => {
  let service: EstadoNegocioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoNegocioService],
    }).compile();

    service = module.get<EstadoNegocioService>(EstadoNegocioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
