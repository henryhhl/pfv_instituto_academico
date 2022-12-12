import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { TipoResultadoService } from './tiporesultado.service';
import { TipoResultado } from './entities/tiporesultado.entity';
import { TipoResultadoController } from './tiporesultado.controller';

@Module({
  controllers: [TipoResultadoController],
  providers: [TipoResultadoService],
  imports: [
    TypeOrmModule.forFeature( [
      TipoResultado,
    ] ),
    AuthModule,
  ],
})
export class TipoResultadoModule {}
