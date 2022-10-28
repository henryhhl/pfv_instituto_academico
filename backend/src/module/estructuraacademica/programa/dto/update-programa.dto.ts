import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaDto } from './create-programa.dto';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProgramaDto extends PartialType(CreateProgramaDto) {

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;
    
}
