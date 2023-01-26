import { Test, TestingModule } from '@nestjs/testing';
import { AsignarRolController } from './asignarrol.controller';
import { AsignarRolService } from './asignarrol.service';

describe('AsignarRolController', () => {
  let controller: AsignarRolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsignarRolController],
      providers: [AsignarRolService],
    }).compile();

    controller = module.get<AsignarRolController>(AsignarRolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
