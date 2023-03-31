import { Test, TestingModule } from '@nestjs/testing';
import { NotagrupoService } from './notagrupo.service';

describe('NotagrupoService', () => {
  let service: NotagrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotagrupoService],
    }).compile();

    service = module.get<NotagrupoService>(NotagrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
