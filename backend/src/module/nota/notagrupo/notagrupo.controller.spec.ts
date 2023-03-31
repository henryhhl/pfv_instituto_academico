import { Test, TestingModule } from '@nestjs/testing';
import { NotagrupoController } from './notagrupo.controller';
import { NotagrupoService } from './notagrupo.service';

describe('NotagrupoController', () => {
  let controller: NotagrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotagrupoController],
      providers: [NotagrupoService],
    }).compile();

    controller = module.get<NotagrupoController>(NotagrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
