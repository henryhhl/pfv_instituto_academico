import { PartialType } from '@nestjs/mapped-types';
import { CreateModalidadAcademicaDto } from './create-modalidadacademica.dto';
import { IsString, IsOptional, MinLength, IsIn } from 'class-validator';

export class UpdateModalidadAcademicaDto extends PartialType(CreateModalidadAcademicaDto) {

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
