import { Test, TestingModule } from '@nestjs/testing';
import { CiudadclasificacionService } from './ciudadclasificacion.service';

describe('CiudadclasificacionService', () => {
  let service: CiudadclasificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiudadclasificacionService],
    }).compile();

    service = module.get<CiudadclasificacionService>(CiudadclasificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
