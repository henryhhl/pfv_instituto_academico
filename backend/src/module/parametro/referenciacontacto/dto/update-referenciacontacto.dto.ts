
import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateReferenciaContactoDto } from './create-referenciacontacto.dto';

export class UpdateReferenciaContactoDto extends PartialType(CreateReferenciaContactoDto) {

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
