import { Test, TestingModule } from '@nestjs/testing';
import { InscripciongrupoController } from './inscripciongrupo.controller';
import { InscripciongrupoService } from './inscripciongrupo.service';

describe('InscripciongrupoController', () => {
  let controller: InscripciongrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InscripciongrupoController],
      providers: [InscripciongrupoService],
    }).compile();

    controller = module.get<InscripciongrupoController>(InscripciongrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
