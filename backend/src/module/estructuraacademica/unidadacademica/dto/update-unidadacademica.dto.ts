import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadAcademicaDto } from './create-unidadacademica.dto';
import { IsString, IsOptional, MinLength, IsIn } from 'class-validator';

export class UpdateUnidadAcademicaDto extends PartialType(CreateUnidadAcademicaDto) {
    
    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
