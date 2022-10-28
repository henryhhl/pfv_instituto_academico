import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadAdministrativaDto } from './create-unidadadministrativa.dto';
import { IsString, IsOptional, MinLength, IsIn } from 'class-validator';

export class UpdateUnidadAdministrativaDto extends PartialType(CreateUnidadAdministrativaDto) {
    
    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
