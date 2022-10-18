import { Test, TestingModule } from '@nestjs/testing';
import { PensumController } from './pensum.controller';
import { PensumService } from './pensum.service';

describe('PensumController', () => {
  let controller: PensumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PensumController],
      providers: [PensumService],
    }).compile();

    controller = module.get<PensumController>(PensumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
