import { Test, TestingModule } from '@nestjs/testing';
import { NotacursoController } from './notacurso.controller';
import { NotacursoService } from './notacurso.service';

describe('NotacursoController', () => {
  let controller: NotacursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotacursoController],
      providers: [NotacursoService],
    }).compile();

    controller = module.get<NotacursoController>(NotacursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
