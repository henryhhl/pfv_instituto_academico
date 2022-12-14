import { Test, TestingModule } from '@nestjs/testing';
import { ReferenciaContactoService } from './referenciacontacto.service';

describe('ReferenciaContactoService', () => {
  let service: ReferenciaContactoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenciaContactoService],
    }).compile();

    service = module.get<ReferenciaContactoService>(ReferenciaContactoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
