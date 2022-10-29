import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateCiudadDto {

    @IsNotEmpty( { message: 'Campo ID Tipo Ciudad es requerido.', } )
    @IsString( { message: 'Campo ID Tipo Ciudad solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo ID Tipo Ciudad debe ser mayor o igual a 1 carácter.', } )
    readonly fkidtipociudad: string;

    @IsNotEmpty( { message: 'Campo Tipo Ciudad es requerido.', } )
    @IsString( { message: 'Campo Tipo Ciudad solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Tipo Ciudad debe ser mayor o igual a 1 carácter.', } )
    readonly tipociudad: string;

    @IsNotEmpty( { message: 'Campo ID CIUDAD es requerido.', } )
    @IsString( { message: 'Campo ID CIUDAD solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidciudadpadre?: string;

    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo sigla debe ser mayor o igual a 1 carácter.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

    @IsNotEmpty( { message: 'Campo imagen es requerido.', } )
    @IsString( { message: 'Campo imagen solo permitido tipo STRING.', } )
    @IsOptional()
    readonly imagen?: string;

}
