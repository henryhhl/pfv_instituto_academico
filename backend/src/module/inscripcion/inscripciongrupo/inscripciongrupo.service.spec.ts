import { Test, TestingModule } from '@nestjs/testing';
import { InscripciongrupoService } from './inscripciongrupo.service';

describe('InscripciongrupoService', () => {
  let service: InscripciongrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InscripciongrupoService],
    }).compile();

    service = module.get<InscripciongrupoService>(InscripciongrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
