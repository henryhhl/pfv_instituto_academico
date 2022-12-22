import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcionGrupoDto } from './create-inscripciongrupo.dto';

export class UpdateInscripcionGrupoDto extends PartialType(CreateInscripcionGrupoDto) {}
