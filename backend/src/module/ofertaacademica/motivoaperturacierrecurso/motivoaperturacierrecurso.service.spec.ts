import { Test, TestingModule } from '@nestjs/testing';
import { MotivoAperturaCierreCursoService } from './motivoaperturacierrecurso.service';

describe('MotivoAperturaCierreCursoService', () => {
  let service: MotivoAperturaCierreCursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotivoAperturaCierreCursoService],
    }).compile();

    service = module.get<MotivoAperturaCierreCursoService>(MotivoAperturaCierreCursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
