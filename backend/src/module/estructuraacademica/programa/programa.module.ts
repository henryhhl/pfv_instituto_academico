import { Module } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Programa } from './entities/programa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [ProgramaController],
  providers: [ProgramaService],
  
  imports: [
    // MongooseModule.forFeature( [
    //   {
    //     name: Programa.name,
    //     schema: ProgramaSchema,
    //   },
    // ] ),
    TypeOrmModule.forFeature( [
      Programa,
    ] ),
    AuthModule,
  ],
})
export class ProgramaModule {}
