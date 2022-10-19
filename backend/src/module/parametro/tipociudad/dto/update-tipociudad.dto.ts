import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoCiudadDto } from './create-tipociudad.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTipoCiudadDto extends PartialType(CreateTipoCiudadDto) {

    @IsOptional()
    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    readonly estado?: string;

}
