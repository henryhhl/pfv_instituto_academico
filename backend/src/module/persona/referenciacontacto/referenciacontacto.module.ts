
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenciaContactoService } from './referenciacontacto.service';
import { ReferenciaContactoController } from './referenciacontacto.controller';
import { ReferenciaContacto } from './entities/referenciacontacto.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [
    ReferenciaContactoController
  ],
  providers: [
    ReferenciaContactoService
  ],
  imports: [
    TypeOrmModule.forFeature( [
      ReferenciaContacto
    ] ),
    AuthModule,
  ],
})
export class ReferenciaContactoModule {}
