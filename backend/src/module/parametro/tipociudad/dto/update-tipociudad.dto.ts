import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoCiudadDto } from './create-tipociudad.dto';
import { IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class UpdateTipoCiudadDto extends PartialType(CreateTipoCiudadDto) {

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
