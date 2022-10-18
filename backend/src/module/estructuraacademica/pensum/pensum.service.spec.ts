import { Test, TestingModule } from '@nestjs/testing';
import { PensumService } from './pensum.service';

describe('PensumService', () => {
  let service: PensumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PensumService],
    }).compile();

    service = module.get<PensumService>(PensumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
