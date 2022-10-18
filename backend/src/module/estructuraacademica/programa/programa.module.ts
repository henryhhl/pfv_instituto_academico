import { Module } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Programa } from './entities/programa.entity';

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
  ],
})
export class ProgramaModule {}
