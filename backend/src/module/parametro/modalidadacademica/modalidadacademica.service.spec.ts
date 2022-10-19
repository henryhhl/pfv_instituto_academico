import { Test, TestingModule } from '@nestjs/testing';
import { ModalidadacademicaService } from './modalidadacademica.service';

describe('ModalidadacademicaService', () => {
  let service: ModalidadacademicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModalidadacademicaService],
    }).compile();

    service = module.get<ModalidadacademicaService>(ModalidadacademicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
