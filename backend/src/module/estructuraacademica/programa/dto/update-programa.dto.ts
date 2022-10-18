import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaDto } from './create-programa.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateProgramaDto extends PartialType(CreateProgramaDto) {

    @IsNotEmpty( { message: 'Campo estado es requerido.', } )
    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo estado debe ser mayor o igual a 1 carácter.', } )
    readonly estado: String;
    
}
