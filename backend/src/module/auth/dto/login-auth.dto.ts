import { IsString, MinLength, IsNotEmpty, IsEmail, MaxLength, Matches } from 'class-validator';

export class LoginAuthDto {

    @IsNotEmpty( { message: 'Campo login es requerido.', } )
    @IsString( { message: 'Campo es requerido de tipo String.', } )
    @MinLength(1, { message: 'Campo login debe ser mayor o igual a 1 carácter.', })
    readonly login: string;

    @IsNotEmpty( { message: 'Campo password es requerido.', } )
    @IsString( { message: 'Campo password es requerido de tipo String.', } )
    @MinLength(6, { message: 'Campo password debe ser mayor o igual a 6 carácter.', } )
    @MaxLength(50, { message: 'Campo password debe ser menor o igual a 50 carácter.', } )
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, minúscula y un número'
    })
    readonly password: string;

}
