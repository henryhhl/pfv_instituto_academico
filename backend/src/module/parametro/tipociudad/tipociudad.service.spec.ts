import { Test, TestingModule } from '@nestjs/testing';
import { TipoCiudadService } from './tipociudad.service';

describe('TipoCiudadService', () => {
  let service: TipoCiudadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoCiudadService],
    }).compile();

    service = module.get<TipoCiudadService>(TipoCiudadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
