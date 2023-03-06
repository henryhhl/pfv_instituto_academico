import { PartialType } from '@nestjs/mapped-types';
import { CreateAsistenciagrupoDto } from './create-asistenciagrupo.dto';

export class UpdateAsistenciagrupoDto extends PartialType(CreateAsistenciagrupoDto) {}
