import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionGrupoService } from './inscripciongrupo.service';

describe('InscripcionGrupoService', () => {
  let service: InscripcionGrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InscripcionGrupoService],
    }).compile();

    service = module.get<InscripcionGrupoService>(InscripcionGrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
