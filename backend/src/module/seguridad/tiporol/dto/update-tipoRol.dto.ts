import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateTipoRolDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly idtiporol?: string;

    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(2)
    @IsOptional()
    readonly descripcion?: string;

    @IsString( { message: 'Campo estado es requerido.', } )
    @IsOptional()
    readonly estado?: string;

}
