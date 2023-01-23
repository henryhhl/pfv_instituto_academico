import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarioAcademicoDto } from './create-calendarioacademico.dto';

export class UpdateCalendarioAcademicoDto extends PartialType(CreateCalendarioAcademicoDto) {}
