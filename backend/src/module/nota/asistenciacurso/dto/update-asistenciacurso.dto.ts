import { PartialType } from '@nestjs/mapped-types';
import { CreateAsistenciacursoDto } from './create-asistenciacurso.dto';

export class UpdateAsistenciacursoDto extends PartialType(CreateAsistenciacursoDto) {}
