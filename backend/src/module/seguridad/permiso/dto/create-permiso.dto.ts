import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class CreatePermisoDto {

    @IsNotEmpty( { message: 'Campo ID PERMISO es requerido.', } )
    @IsString( { message: 'Campo ID PERMISO solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidpermisopadre?: string;

    @IsNotEmpty( { message: 'Campo ID Tipo Permiso es requerido.', } )
    @IsString( { message: 'Campo ID Tipo Permiso solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo ID Tipo Permiso debe ser mayor o igual a 1 carácter.', } )
    readonly fkidtipopermiso: string;

    @IsNotEmpty( { message: 'Campo Tipo Permiso es requerido.', } )
    @IsString( { message: 'Campo Tipo Permiso solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Tipo Permiso debe ser mayor o igual a 1 carácter.', } )
    readonly tipopermiso: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

    @IsNotEmpty( { message: 'Campo imagen es requerido.', } )
    @IsString( { message: 'Campo imagen solo permitido tipo STRING.', } )
    @IsOptional()
    readonly imagen?: string;

}
