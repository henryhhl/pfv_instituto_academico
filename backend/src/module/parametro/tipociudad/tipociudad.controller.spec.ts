import { Test, TestingModule } from '@nestjs/testing';
import { TipoCiudadController } from './tipociudad.controller';
import { TipoCiudadService } from './tipociudad.service';

describe('TipoCiudadController', () => {
  let controller: TipoCiudadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCiudadController],
      providers: [TipoCiudadService],
    }).compile();

    controller = module.get<TipoCiudadController>(TipoCiudadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
