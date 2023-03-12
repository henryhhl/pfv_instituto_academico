import { PartialType } from '@nestjs/mapped-types';
import { CreateAsistenciaCursoDto } from './create-asistenciacurso.dto';

export class UpdateAsistenciacursoDto extends PartialType(CreateAsistenciaCursoDto) {}
