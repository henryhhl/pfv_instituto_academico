import { Test, TestingModule } from '@nestjs/testing';
import { AsistenciagrupoController } from './asistenciagrupo.controller';
import { AsistenciagrupoService } from './asistenciagrupo.service';

describe('AsistenciagrupoController', () => {
  let controller: AsistenciagrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsistenciagrupoController],
      providers: [AsistenciagrupoService],
    }).compile();

    controller = module.get<AsistenciagrupoController>(AsistenciagrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
