import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcionCursoDto } from './create-inscripcioncurso.dto';

export class UpdateInscripcionCursoDto extends PartialType(CreateInscripcionCursoDto) {}
