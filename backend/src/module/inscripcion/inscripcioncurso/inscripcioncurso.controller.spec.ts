import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionCursoController } from './inscripcioncurso.controller';
import { InscripcionCursoService } from './inscripcioncurso.service';

describe('InscripcionCursoController', () => {
  let controller: InscripcionCursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InscripcionCursoController],
      providers: [InscripcionCursoService],
    }).compile();

    controller = module.get<InscripcionCursoController>(InscripcionCursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
