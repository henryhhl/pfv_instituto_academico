import { PartialType } from '@nestjs/mapped-types';
import { CreateNotaCursoDto } from './create-notacurso.dto';

export class UpdateNotacursoDto extends PartialType(CreateNotaCursoDto) {}
