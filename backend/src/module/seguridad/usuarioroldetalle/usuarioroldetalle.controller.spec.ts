import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioroldetalleController } from './usuarioroldetalle.controller';
import { UsuarioroldetalleService } from './usuarioroldetalle.service';

describe('UsuarioroldetalleController', () => {
  let controller: UsuarioroldetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioroldetalleController],
      providers: [UsuarioroldetalleService],
    }).compile();

    controller = module.get<UsuarioroldetalleController>(UsuarioroldetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
