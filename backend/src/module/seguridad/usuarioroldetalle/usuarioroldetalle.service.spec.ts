import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRolDetalleService } from './usuarioroldetalle.service';

describe('UsuarioroldetalleService', () => {
  let service: UsuarioRolDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioRolDetalleService],
    }).compile();

    service = module.get<UsuarioRolDetalleService>(UsuarioRolDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
