import { Test, TestingModule } from '@nestjs/testing';
import { AsistenciacursoController } from './asistenciacurso.controller';
import { AsistenciacursoService } from './asistenciacurso.service';

describe('AsistenciacursoController', () => {
  let controller: AsistenciacursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsistenciacursoController],
      providers: [AsistenciacursoService],
    }).compile();

    controller = module.get<AsistenciacursoController>(AsistenciacursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
