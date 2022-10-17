import { Module } from '@nestjs/common';
import { UnidadAdministrativaService } from './unidadadministrativa.service';
import { UnidadadministrativaController } from './unidadadministrativa.controller';

@Module({
  controllers: [UnidadadministrativaController],
  providers: [UnidadAdministrativaService]
})
export class UnidadAdministrativaModule {}
