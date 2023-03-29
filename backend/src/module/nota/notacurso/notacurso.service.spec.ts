import { Test, TestingModule } from '@nestjs/testing';
import { NotacursoService } from './notacurso.service';

describe('NotacursoService', () => {
  let service: NotacursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotacursoService],
    }).compile();

    service = module.get<NotacursoService>(NotacursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
