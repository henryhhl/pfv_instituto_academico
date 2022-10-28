import { Test, TestingModule } from '@nestjs/testing';
import { TipoRolService } from './tiporol.service';

describe('TipoRolService', () => {
  let service: TipoRolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoRolService],
    }).compile();

    service = module.get<TipoRolService>(TipoRolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
