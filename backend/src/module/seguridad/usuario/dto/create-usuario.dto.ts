import { IsString, MinLength, IsNotEmpty, IsEmail, MaxLength, Matches } from 'class-validator';

export class CreateUsuarioDto {

    @IsNotEmpty( { message: 'Campo nombreprincipal es requerido.', } )
    @IsString( { message: 'Campo nombreprincipal es requerido tipo String.', } )
    readonly nombreprincipal: string;

    @IsNotEmpty( { message: 'Campo email es requerido.', } )
    @IsString( { message: 'Campo email es requerido tipo String.', } )
    @IsEmail( { message: 'Campo es requerido de tipo email.', } )
    readonly email: string;

    @IsNotEmpty( { message: 'Campo login es requerido.', } )
    @IsString( { message: 'Campo login es requerido tipo String.', } )
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
