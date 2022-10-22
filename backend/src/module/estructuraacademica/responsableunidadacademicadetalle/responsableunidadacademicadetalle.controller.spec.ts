import { Test, TestingModule } from '@nestjs/testing';
import { ResponsableUnidadAcademicaDetalleController } from './responsableunidadacademicadetalle.controller';
import { ResponsableUnidadAcademicaDetalleService } from './responsableunidadacademicadetalle.service';

describe('ResponsableUnidadAcademicaDetalleController', () => {
  let controller: ResponsableUnidadAcademicaDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsableUnidadAcademicaDetalleController],
      providers: [ResponsableUnidadAcademicaDetalleService],
    }).compile();

    controller = module.get<ResponsableUnidadAcademicaDetalleController>(ResponsableUnidadAcademicaDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
