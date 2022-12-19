import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionCursoService } from './inscripcioncurso.service';

describe('InscripcionCursoService', () => {
  let service: InscripcionCursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InscripcionCursoService],
    }).compile();

    service = module.get<InscripcionCursoService>(InscripcionCursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
