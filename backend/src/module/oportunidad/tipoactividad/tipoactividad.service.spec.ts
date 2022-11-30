import { Test, TestingModule } from '@nestjs/testing';
import { TipoActividadService } from './tipoactividad.service';

describe('TipoActividadService', () => {
  let service: TipoActividadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoActividadService],
    }).compile();

    service = module.get<TipoActividadService>(TipoActividadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
