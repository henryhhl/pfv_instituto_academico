import { Test, TestingModule } from '@nestjs/testing';
import { OfertaacademicaController } from './ofertaacademica.controller';
import { OfertaacademicaService } from './ofertaacademica.service';

describe('OfertaacademicaController', () => {
  let controller: OfertaacademicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfertaacademicaController],
      providers: [OfertaacademicaService],
    }).compile();

    controller = module.get<OfertaacademicaController>(OfertaacademicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
