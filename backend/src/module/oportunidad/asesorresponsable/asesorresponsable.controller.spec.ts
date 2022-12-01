import { Test, TestingModule } from '@nestjs/testing';
import { AsesorresponsableController } from './asesorresponsable.controller';
import { AsesorresponsableService } from './asesorresponsable.service';

describe('AsesorresponsableController', () => {
  let controller: AsesorresponsableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsesorresponsableController],
      providers: [AsesorresponsableService],
    }).compile();

    controller = module.get<AsesorresponsableController>(AsesorresponsableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
