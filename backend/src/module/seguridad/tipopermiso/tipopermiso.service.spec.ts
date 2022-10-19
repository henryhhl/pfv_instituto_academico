import { Test, TestingModule } from '@nestjs/testing';
import { TipopermisoService } from './tipopermiso.service';

describe('TipopermisoService', () => {
  let service: TipopermisoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipopermisoService],
    }).compile();

    service = module.get<TipopermisoService>(TipopermisoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
