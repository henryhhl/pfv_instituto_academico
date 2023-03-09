import { PartialType } from '@nestjs/mapped-types';
import { CreateAsistenciaGrupoDto } from './create-asistenciagrupo.dto';

export class UpdateAsistenciagrupoDto extends PartialType(CreateAsistenciaGrupoDto) {}
