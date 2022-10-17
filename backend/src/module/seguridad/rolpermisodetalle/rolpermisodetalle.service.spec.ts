import { Test, TestingModule } from '@nestjs/testing';
import { RolpermisodetalleService } from './rolpermisodetalle.service';

describe('RolpermisodetalleService', () => {
  let service: RolpermisodetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolpermisodetalleService],
    }).compile();

    service = module.get<RolpermisodetalleService>(RolpermisodetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
