import { Test, TestingModule } from '@nestjs/testing';
import { OfertaacademicaService } from './ofertaacademica.service';

describe('OfertaacademicaService', () => {
  let service: OfertaacademicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfertaacademicaService],
    }).compile();

    service = module.get<OfertaacademicaService>(OfertaacademicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
