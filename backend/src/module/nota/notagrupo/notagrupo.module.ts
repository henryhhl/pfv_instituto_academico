import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { NotagrupoService } from './notagrupo.service';
import { NotagrupoController } from './notagrupo.controller';
import { NotaGrupo } from 'src/module/nota/notagrupo/entities/notagrupo.entity';

@Module({
  controllers: [NotagrupoController],
  providers: [NotagrupoService],
  exports: [NotagrupoService],
  imports: [
    TypeOrmModule.forFeature( [
      NotaGrupo,
    ] ),
    AuthModule,
  ],
})
export class NotagrupoModule {}
