import { Module } from '@nestjs/common';
import { UnidadadministrativaService } from './unidadadministrativa.service';
import { UnidadadministrativaController } from './unidadadministrativa.controller';

@Module({
  controllers: [UnidadadministrativaController],
  providers: [UnidadadministrativaService]
})
export class UnidadadministrativaModule {}
