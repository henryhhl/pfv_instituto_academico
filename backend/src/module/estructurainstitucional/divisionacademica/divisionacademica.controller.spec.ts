import { Test, TestingModule } from '@nestjs/testing';
import { DivisionAcademicaController } from './divisionacademica.controller';
import { DivisionAcademicaService } from './divisionacademica.service';

describe('DivisionAcademicaController', () => {
  let controller: DivisionAcademicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DivisionAcademicaController],
      providers: [DivisionAcademicaService],
    }).compile();

    controller = module.get<DivisionAcademicaController>(DivisionAcademicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
