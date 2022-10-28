import { Test, TestingModule } from '@nestjs/testing';
import { OfertaAcademicaService } from './ofertaacademica.service';

describe('OfertaAcademicaService', () => {
  let service: OfertaAcademicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfertaAcademicaService],
    }).compile();

    service = module.get<OfertaAcademicaService>(OfertaAcademicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
