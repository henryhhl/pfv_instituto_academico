import { Test, TestingModule } from '@nestjs/testing';
import { GestionPeriodoService } from './gestionperiodo.service';

describe('GestionPeriodoService', () => {
  let service: GestionPeriodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionPeriodoService],
    }).compile();

    service = module.get<GestionPeriodoService>(GestionPeriodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
