import { Test, TestingModule } from '@nestjs/testing';
import { AsistenciacursoService } from './asistenciacurso.service';

describe('AsistenciacursoService', () => {
  let service: AsistenciacursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsistenciacursoService],
    }).compile();

    service = module.get<AsistenciacursoService>(AsistenciacursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
