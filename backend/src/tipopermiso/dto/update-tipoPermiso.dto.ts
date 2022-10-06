import { IsOptional, IsString, IsUUID, MinLength,  } from "class-validator";

export class UpdateTipoPermisoDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly idtipopermiso?: string;

    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(2)
    @IsOptional()
    readonly descripcion?: string;

    @IsString( { message: 'Campo estado es requerido.', } )
    @IsOptional()
    readonly estado?: string;

}
