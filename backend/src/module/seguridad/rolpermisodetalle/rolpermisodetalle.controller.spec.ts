import { Test, TestingModule } from '@nestjs/testing';
import { RolpermisodetalleController } from './rolpermisodetalle.controller';
import { RolpermisodetalleService } from './rolpermisodetalle.service';

describe('RolpermisodetalleController', () => {
  let controller: RolpermisodetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolpermisodetalleController],
      providers: [RolpermisodetalleService],
    }).compile();

    controller = module.get<RolpermisodetalleController>(RolpermisodetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
