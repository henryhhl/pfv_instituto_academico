import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginAuthDto {

    @IsNotEmpty( { message: 'Campo login es requerido.', } )
    readonly login: string;

    @IsNotEmpty( { message: 'Campo password es requerido.', } )
    readonly password: string;

    @IsOptional()
    readonly x_fecha?: string;

    @IsOptional()
    readonly x_hora?: string;

}
