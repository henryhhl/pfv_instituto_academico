import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

// export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
export class UpdateUsuarioDto {

    @IsString( { message: 'Campo Email es requerido.', } )
    @IsOptional()
    readonly email: string;

    @IsString( { message: 'Campo Login es requerido.', } )
    @MinLength(3)
    @IsOptional()
    readonly login: string;

    @IsString( { message: 'Campo Password es requerido.', } )
    @MinLength(4)
    @IsOptional()
    readonly password: string;

    @IsString( { message: 'Campo estado es requerido.', } )
    @IsOptional()
    readonly estado?: string;

}
