import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionProgramaController } from './inscripcionprograma.controller';
import { InscripcionProgramaService } from './inscripcionprograma.service';

describe('InscripcionProgramaController', () => {
  let controller: InscripcionProgramaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InscripcionProgramaController],
      providers: [InscripcionProgramaService],
    }).compile();

    controller = module.get<InscripcionProgramaController>(InscripcionProgramaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
