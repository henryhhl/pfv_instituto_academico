import { Test, TestingModule } from '@nestjs/testing';
import { AsistenciagrupoService } from './asistenciagrupo.service';

describe('AsistenciagrupoService', () => {
  let service: AsistenciagrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsistenciagrupoService],
    }).compile();

    service = module.get<AsistenciagrupoService>(AsistenciagrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
