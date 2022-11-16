import { PartialType } from '@nestjs/mapped-types';
import { IsString, MinLength, IsIn, IsOptional } from 'class-validator';
import { CreateEstudianteDto } from './create-estudiante.dto';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;
}
