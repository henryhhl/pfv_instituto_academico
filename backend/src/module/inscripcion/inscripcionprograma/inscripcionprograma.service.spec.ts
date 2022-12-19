import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionProgramaService } from './inscripcionprograma.service';

describe('InscripcionProgramaService', () => {
  let service: InscripcionProgramaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InscripcionProgramaService],
    }).compile();

    service = module.get<InscripcionProgramaService>(InscripcionProgramaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
