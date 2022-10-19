import { Test, TestingModule } from '@nestjs/testing';
import { NivelacademicoService } from './nivelacademico.service';

describe('NivelacademicoService', () => {
  let service: NivelacademicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NivelacademicoService],
    }).compile();

    service = module.get<NivelacademicoService>(NivelacademicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
