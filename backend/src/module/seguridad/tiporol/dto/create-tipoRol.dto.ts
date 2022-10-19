import { IsString, MinLength } from "class-validator";

export class CreateTipoRolDto {

    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(2)
    readonly descripcion: string;

}
