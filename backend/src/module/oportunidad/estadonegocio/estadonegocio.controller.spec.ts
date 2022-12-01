import { Test, TestingModule } from '@nestjs/testing';
import { EstadoNegocioController } from './estadonegocio.controller';
import { EstadoNegocioService } from './estadonegocio.service';

describe('EstadoNegocioController', () => {
  let controller: EstadoNegocioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoNegocioController],
      providers: [EstadoNegocioService],
    }).compile();

    controller = module.get<EstadoNegocioController>(EstadoNegocioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
