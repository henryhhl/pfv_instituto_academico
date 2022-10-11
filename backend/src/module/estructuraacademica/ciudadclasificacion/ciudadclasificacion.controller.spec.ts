import { Test, TestingModule } from '@nestjs/testing';
import { CiudadclasificacionController } from './ciudadclasificacion.controller';
import { CiudadclasificacionService } from './ciudadclasificacion.service';

describe('CiudadclasificacionController', () => {
  let controller: CiudadclasificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiudadclasificacionController],
      providers: [CiudadclasificacionService],
    }).compile();

    controller = module.get<CiudadclasificacionController>(CiudadclasificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
