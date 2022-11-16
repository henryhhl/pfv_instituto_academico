import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { CategoriaDocumentoService } from './categoriadocumento.service';
import { CategoriaDocumento } from './entities/categoriadocumento.entity';
import { CategoriaDocumentoController } from './categoriadocumento.controller';

@Module({
  controllers: [CategoriaDocumentoController],
  providers: [CategoriaDocumentoService],
  imports: [
    TypeOrmModule.forFeature( [
      CategoriaDocumento
    ] ),
    AuthModule,
  ],
})
export class CategoriaDocumentoModule {}
