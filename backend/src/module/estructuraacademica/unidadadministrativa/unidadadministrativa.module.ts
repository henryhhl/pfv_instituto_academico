import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadAdministrativaService } from './unidadadministrativa.service';
import { UnidadAdministrativaController } from './unidadadministrativa.controller';
import { UnidadAdministrativa } from './entities/unidadadministrativa.entity';

@Module({
  controllers: [UnidadAdministrativaController],
  providers: [UnidadAdministrativaService],
  imports: [
    TypeOrmModule.forFeature( [
      UnidadAdministrativa
    ] ),
  ],
})
export class UnidadAdministrativaModule {}
