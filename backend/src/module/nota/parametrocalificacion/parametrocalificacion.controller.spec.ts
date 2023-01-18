import { Test, TestingModule } from '@nestjs/testing';
import { ParametroCalificacionController } from './parametrocalificacion.controller';
import { ParametroCalificacionService } from './parametrocalificacion.service';

describe('ParametroCalificacionController', () => {
  let controller: ParametroCalificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParametroCalificacionController],
      providers: [ParametroCalificacionService],
    }).compile();

    controller = module.get<ParametroCalificacionController>(ParametroCalificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
