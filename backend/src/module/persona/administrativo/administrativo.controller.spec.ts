import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativoController } from './administrativo.controller';
import { AdministrativoService } from './administrativo.service';

describe('AdministrativoController', () => {
  let controller: AdministrativoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrativoController],
      providers: [AdministrativoService],
    }).compile();

    controller = module.get<AdministrativoController>(AdministrativoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
