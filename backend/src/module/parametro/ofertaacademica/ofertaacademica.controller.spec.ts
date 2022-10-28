import { Test, TestingModule } from '@nestjs/testing';
import { OfertaAcademicaController } from './ofertaacademica.controller';
import { OfertaAcademicaService } from './ofertaacademica.service';

describe('OfertaAcademicaController', () => {
  let controller: OfertaAcademicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfertaAcademicaController],
      providers: [OfertaAcademicaService],
    }).compile();

    controller = module.get<OfertaAcademicaController>(OfertaAcademicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
