import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateTipoRolDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly idtiporol?: string;

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(2)
    @IsOptional()
    readonly descripcion?: string;

}
