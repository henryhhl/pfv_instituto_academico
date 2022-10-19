import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTipoCiudadDto {

    @IsNotEmpty( { message: 'Campo Descripción es requerido.', } )
    @IsString( { message: 'Campo Descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

}
