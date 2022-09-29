import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateTipoPermisoDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly idtipopermiso?: string;

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(2)
    @IsOptional()
    readonly descripcion?: string;

}
