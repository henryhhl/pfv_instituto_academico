import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcionProgramaDto } from './create-inscripcionprograma.dto';

export class UpdateInscripcionProgramaDto extends PartialType(CreateInscripcionProgramaDto) {}
