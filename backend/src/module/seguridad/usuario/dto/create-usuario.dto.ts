import { IsString, MinLength, IsNotEmpty, IsEmail, MaxLength, Matches } from 'class-validator';

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
    @IsString( { message: 'Campo password es requerido de tipo String.', } )
    @MinLength(6, { message: 'Campo password debe ser mayor o igual a 6 carácter.', } )
    @MaxLength(100, { message: 'Campo password debe ser menor o igual a 100 carácter.', } )
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, minúscula y un número'
    })
    readonly password: string;

}
