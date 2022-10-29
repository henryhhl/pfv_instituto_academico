import { Test, TestingModule } from '@nestjs/testing';
import { DivisionAcademicaService } from './divisionacademica.service';

describe('DivisionAcademicaService', () => {
  let service: DivisionAcademicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivisionAcademicaService],
    }).compile();

    service = module.get<DivisionAcademicaService>(DivisionAcademicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
