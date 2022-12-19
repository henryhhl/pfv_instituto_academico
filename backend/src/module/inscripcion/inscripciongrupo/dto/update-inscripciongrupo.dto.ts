import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripciongrupoDto } from './create-inscripciongrupo.dto';

export class UpdateInscripciongrupoDto extends PartialType(CreateInscripciongrupoDto) {}
