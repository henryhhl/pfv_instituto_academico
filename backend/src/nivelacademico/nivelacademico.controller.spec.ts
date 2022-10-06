import { Test, TestingModule } from '@nestjs/testing';
import { NivelacademicoController } from './nivelacademico.controller';
import { NivelacademicoService } from './nivelacademico.service';

describe('NivelacademicoController', () => {
  let controller: NivelacademicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelacademicoController],
      providers: [NivelacademicoService],
    }).compile();

    controller = module.get<NivelacademicoController>(NivelacademicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
