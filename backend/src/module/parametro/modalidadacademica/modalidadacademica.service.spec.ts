import { Test, TestingModule } from '@nestjs/testing';
import { ModalidadAcademicaService } from './modalidadacademica.service';

describe('ModalidadAcademicaService', () => {
  let service: ModalidadAcademicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModalidadAcademicaService],
    }).compile();

    service = module.get<ModalidadAcademicaService>(ModalidadAcademicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
