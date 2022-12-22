import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionGrupoController } from './inscripciongrupo.controller';
import { InscripcionGrupoService } from './inscripciongrupo.service';

describe('InscripcionGrupoController', () => {
  let controller: InscripcionGrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InscripcionGrupoController],
      providers: [InscripcionGrupoService],
    }).compile();

    controller = module.get<InscripcionGrupoController>(InscripcionGrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
