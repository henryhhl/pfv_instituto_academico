import { Module } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { BitacoraController } from './bitacora.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bitacora } from './entities/bitacora.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [BitacoraController],
  providers: [BitacoraService],
  exports: [BitacoraService],
  imports: [
    TypeOrmModule.forFeature( [
      Bitacora,
    ] ),
    AuthModule,
  ],
})
export class BitacoraModule {}
