import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaDocumentoService } from './categoriadocumento.service';

describe('CategoriaDocumentoService', () => {
  let service: CategoriaDocumentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaDocumentoService],
    }).compile();

    service = module.get<CategoriaDocumentoService>(CategoriaDocumentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
