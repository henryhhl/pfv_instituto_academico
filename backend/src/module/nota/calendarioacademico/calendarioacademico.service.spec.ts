import { Test, TestingModule } from '@nestjs/testing';
import { CalendarioAcademicoService } from './calendarioacademico.service';

describe('CalendarioAcademicoService', () => {
  let service: CalendarioAcademicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarioAcademicoService],
    }).compile();

    service = module.get<CalendarioAcademicoService>(CalendarioAcademicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
