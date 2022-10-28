import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTipoRolDto {

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', })
    readonly descripcion: string;

}
