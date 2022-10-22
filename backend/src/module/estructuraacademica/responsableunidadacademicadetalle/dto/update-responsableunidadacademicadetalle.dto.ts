import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsableUnidadAcademicaDetalleDto } from './create-responsableunidadacademicadetalle.dto';

export class UpdateResponsableunidadacademicadetalleDto extends PartialType(CreateResponsableUnidadAcademicaDetalleDto) {}
