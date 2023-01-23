import { Test, TestingModule } from '@nestjs/testing';
import { CalendarioAcademicoController } from './calendarioacademico.controller';
import { CalendarioAcademicoService } from './calendarioacademico.service';

describe('CalendarioAcademicoController', () => {
  let controller: CalendarioAcademicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarioAcademicoController],
      providers: [CalendarioAcademicoService],
    }).compile();

    controller = module.get<CalendarioAcademicoController>(CalendarioAcademicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
