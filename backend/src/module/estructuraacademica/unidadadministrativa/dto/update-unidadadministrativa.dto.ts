import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadadministrativaDto } from './create-unidadadministrativa.dto';

export class UpdateUnidadadministrativaDto extends PartialType(CreateUnidadadministrativaDto) {}
