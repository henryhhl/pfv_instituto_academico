import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTipoIdentificacionDto {

    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo sigla debe ser mayor o igual a 1 carácter.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

}
