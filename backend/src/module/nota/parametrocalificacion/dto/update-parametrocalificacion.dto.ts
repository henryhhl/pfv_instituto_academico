import { PartialType } from '@nestjs/mapped-types';
import { CreateParametrocalificacionDto } from './create-parametrocalificacion.dto';

export class UpdateParametrocalificacionDto extends PartialType(CreateParametrocalificacionDto) {}
