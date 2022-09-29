import { IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {

    @IsString( { message: 'La descripción es requerido.', } )
    readonly email: string;

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(3)
    readonly login: string;

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(4)
    readonly password: string;

}
