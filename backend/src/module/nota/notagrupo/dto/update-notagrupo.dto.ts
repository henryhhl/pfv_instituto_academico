import { PartialType } from '@nestjs/mapped-types';
import { CreateNotaGrupoDto } from './create-notagrupo.dto';

export class UpdateNotagrupoDto extends PartialType(CreateNotaGrupoDto) {}
