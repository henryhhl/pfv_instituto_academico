import { IsString, MinLength } from "class-validator";

export class CreateTipoPermisoDto {

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(2)
    readonly descripcion: string;

}
