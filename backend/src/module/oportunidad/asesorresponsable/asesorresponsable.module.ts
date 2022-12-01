import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { AsesorResponsableService } from './asesorresponsable.service';
import { AsesorResponsable } from './entities/asesorresponsable.entity';
import { AsesorresponsableController } from './asesorresponsable.controller';

@Module({
  controllers: [AsesorresponsableController],
  providers: [AsesorResponsableService],
  imports: [
    TypeOrmModule.forFeature( [
      AsesorResponsable,
    ] ),
    AuthModule,
  ],
})
export class AsesorResponsableModule {}
