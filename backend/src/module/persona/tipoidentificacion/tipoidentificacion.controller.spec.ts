import { Test, TestingModule } from '@nestjs/testing';
import { TipoIdentificacionController } from './tipoidentificacion.controller';
import { TipoIdentificacionService } from './tipoidentificacion.service';

describe('TipoIdentificacionController', () => {
  let controller: TipoIdentificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoIdentificacionController],
      providers: [TipoIdentificacionService],
    }).compile();

    controller = module.get<TipoIdentificacionController>(TipoIdentificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
