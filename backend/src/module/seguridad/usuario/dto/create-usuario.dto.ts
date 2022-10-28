import { IsString, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUsuarioDto {

    @IsNotEmpty( { message: 'Campo email es requerido.', } )
    @IsString( { message: 'Campo es requerido de tipo String.', } )
    @IsEmail( { message: 'Campo es requerido de tipo email.', } )
    @MinLength(1, { message: 'Campo email debe ser mayor o igual a 1 carácter.', })
    readonly email: string;

    @IsNotEmpty( { message: 'Campo login es requerido.', } )
    @IsString( { message: 'Campo es requerido de tipo String.', } )
    @MinLength(1, { message: 'Campo login debe ser mayor o igual a 1 carácter.', })
    readonly login: string;

    @IsNotEmpty( { message: 'Campo password es requerido.', } )
    @IsString( { message: 'Campo es requerido de tipo String.', } )
    @MinLength(1, { message: 'Campo password debe ser mayor o igual a 1 carácter.', })
    readonly password: string;

}
