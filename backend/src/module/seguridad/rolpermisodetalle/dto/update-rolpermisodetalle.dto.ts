import { PartialType } from '@nestjs/mapped-types';
import { CreateRolpermisodetalleDto } from './create-rolpermisodetalle.dto';

export class UpdateRolpermisodetalleDto extends PartialType(CreateRolpermisodetalleDto) {}
