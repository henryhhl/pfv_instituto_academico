import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsableDto } from './create-responsable.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateResponsableDto extends PartialType(CreateResponsableDto) {

    @IsOptional()
    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    readonly estado?: string;

}
