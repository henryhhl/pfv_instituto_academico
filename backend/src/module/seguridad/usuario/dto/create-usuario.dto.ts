import { IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {

    @IsString( { message: 'Campo Email es requerido.', } )
    readonly email: string;

    @IsString( { message: 'Campo Login es requerido.', } )
    @MinLength(3)
    readonly login: string;

    @IsString( { message: 'Campo Password es requerido.', } )
    @MinLength(4)
    readonly password: string;

}
