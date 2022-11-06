import { Module } from '@nestjs/common';
import { CategoriaDocumentoService } from './categoriadocumento.service';
import { CategoriaDocumentoController } from './categoriadocumento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaDocumento } from './entities/categoriadocumento.entity';

@Module({
  controllers: [CategoriaDocumentoController],
  providers: [CategoriaDocumentoService],
  imports: [
    TypeOrmModule.forFeature( [
      CategoriaDocumento
    ] ),
  ],
})
export class CategoriaDocumentoModule {}
