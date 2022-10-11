import { PartialType } from '@nestjs/mapped-types';
import { CreateCiudadclasificacionDto } from './create-ciudadclasificacion.dto';

export class UpdateCiudadclasificacionDto extends PartialType(CreateCiudadclasificacionDto) {}
