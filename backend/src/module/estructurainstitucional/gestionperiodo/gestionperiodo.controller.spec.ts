import { Test, TestingModule } from '@nestjs/testing';
import { GestionPeriodoController } from './gestionperiodo.controller';
import { GestionPeriodoService } from './gestionperiodo.service';

describe('GestionPeriodoController', () => {
  let controller: GestionPeriodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionPeriodoController],
      providers: [GestionPeriodoService],
    }).compile();

    controller = module.get<GestionPeriodoController>(GestionPeriodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
