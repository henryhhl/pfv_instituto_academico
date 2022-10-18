import { PartialType } from '@nestjs/mapped-types';
import { CreatePensumDto } from './create-pensum.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePensumDto extends PartialType(CreatePensumDto) {

    @IsNotEmpty( { message: 'Campo estado es requerido.', } )
    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo estado debe ser mayor o igual a 1 carácter.', } )
    readonly estado: String;
}
