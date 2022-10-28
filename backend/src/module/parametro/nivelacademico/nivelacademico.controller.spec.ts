import { Test, TestingModule } from '@nestjs/testing';
import { NivelAcademicoController } from './nivelacademico.controller';
import { NivelAcademicoService } from './nivelacademico.service';

describe('NivelAcademicoController', () => {
  let controller: NivelAcademicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelAcademicoController],
      providers: [NivelAcademicoService],
    }).compile();

    controller = module.get<NivelAcademicoController>(NivelAcademicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
