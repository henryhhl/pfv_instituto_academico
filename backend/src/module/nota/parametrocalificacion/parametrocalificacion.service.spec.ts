import { Test, TestingModule } from '@nestjs/testing';
import { ParametroCalificacionService } from './parametrocalificacion.service';

describe('ParametroCalificacionService', () => {
  let service: ParametroCalificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParametroCalificacionService],
    }).compile();

    service = module.get<ParametroCalificacionService>(ParametroCalificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
