import { Test, TestingModule } from '@nestjs/testing';
import { AsesorresponsableService } from './asesorresponsable.service';

describe('AsesorresponsableService', () => {
  let service: AsesorresponsableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsesorresponsableService],
    }).compile();

    service = module.get<AsesorresponsableService>(AsesorresponsableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
