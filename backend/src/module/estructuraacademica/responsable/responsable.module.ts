import { Module } from '@nestjs/common';
import { ResponsableService } from './responsable.service';
import { ResponsableController } from './responsable.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [ResponsableController],
  providers: [ResponsableService],
  imports: [
    AuthModule,
  ],
})
export class ResponsableModule {}
