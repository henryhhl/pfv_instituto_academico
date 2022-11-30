import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { TipoMedioPublicitarioService } from './tipomediopublicitario.service';
import { TipoMedioPublicitario } from './entities/tipomediopublicitario.entity';
import { TipoMedioPublicitarioController } from './tipomediopublicitario.controller';

@Module({
  controllers: [TipoMedioPublicitarioController],
  providers: [TipoMedioPublicitarioService],
  imports: [
    TypeOrmModule.forFeature( [
      TipoMedioPublicitario,
    ] ),
    AuthModule,
  ],
})
export class TipomediopublicitarioModule {}
