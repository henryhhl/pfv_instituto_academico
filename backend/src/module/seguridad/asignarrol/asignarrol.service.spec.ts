import { Test, TestingModule } from '@nestjs/testing';
import { AsignarRolService } from './asignarrol.service';

describe('AsignarRolService', () => {
  let service: AsignarRolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsignarRolService],
    }).compile();

    service = module.get<AsignarRolService>(AsignarRolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
