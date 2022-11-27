import { Test, TestingModule } from '@nestjs/testing';
import { MotivoAperturaCierreCursoController } from './motivoaperturacierrecurso.controller';
import { MotivoAperturaCierreCursoService } from './motivoaperturacierrecurso.service';

describe('MotivoAperturaCierreCursoController', () => {
  let controller: MotivoAperturaCierreCursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotivoAperturaCierreCursoController],
      providers: [MotivoAperturaCierreCursoService],
    }).compile();

    controller = module.get<MotivoAperturaCierreCursoController>(MotivoAperturaCierreCursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
