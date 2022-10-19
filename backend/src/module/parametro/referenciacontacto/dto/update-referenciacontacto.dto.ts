
import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenciaContactoDto } from './create-referenciacontacto.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateReferenciaContactoDto extends PartialType(CreateReferenciaContactoDto) {

    @IsOptional()
    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    readonly estado?: string;

}
