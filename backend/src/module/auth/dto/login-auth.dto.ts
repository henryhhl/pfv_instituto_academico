import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {

    @IsNotEmpty( { message: 'Campo login es requerido.', } )
    readonly login: string;

    @IsNotEmpty( { message: 'Campo password es requerido.', } )
    readonly password: string;

}
