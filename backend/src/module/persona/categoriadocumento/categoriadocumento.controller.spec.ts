import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaDocumentoController } from './categoriadocumento.controller';
import { CategoriaDocumentoService } from './categoriadocumento.service';

describe('CategoriaDocumentoController', () => {
  let controller: CategoriaDocumentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaDocumentoController],
      providers: [CategoriaDocumentoService],
    }).compile();

    controller = module.get<CategoriaDocumentoController>(CategoriaDocumentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
