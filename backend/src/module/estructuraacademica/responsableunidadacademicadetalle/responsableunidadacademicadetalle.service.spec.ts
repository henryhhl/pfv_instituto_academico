import { Test, TestingModule } from '@nestjs/testing';
import { ResponsableUnidadAcademicaDetalleService } from './responsableunidadacademicadetalle.service';

describe('ResponsableUnidadAcademicaDetalleService', () => {
  let service: ResponsableUnidadAcademicaDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsableUnidadAcademicaDetalleService],
    }).compile();

    service = module.get<ResponsableUnidadAcademicaDetalleService>(ResponsableUnidadAcademicaDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
