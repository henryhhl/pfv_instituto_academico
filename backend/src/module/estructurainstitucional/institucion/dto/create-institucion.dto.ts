import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateInstitucionDto {

    @IsNotEmpty( { message: 'Campo ID Ciudad es requerido.', } )
    @IsString( { message: 'Campo ID Ciudad solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo ID Ciudad debe ser mayor o igual a 1 carácter.', } )
    readonly fkidciudad: string;

    @IsNotEmpty( { message: 'Campo Ciudad es requerido.', } )
    @IsString( { message: 'Campo Ciudad solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Ciudad debe ser mayor o igual a 1 carácter.', } )
    readonly ciudad: string;
    
    @IsNotEmpty( { message: 'Campo Sigla es requerido.', } )
    @IsString( { message: 'Campo Sigla solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Sigla debe ser mayor o igual a 1 carácter.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

    @IsNotEmpty( { message: 'Campo nit es requerido.', } )
    @IsString( { message: 'Campo nit solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo nit debe ser mayor o igual a 1 carácter.', } )
    readonly nit: string;

    @IsString( { message: 'Campo telefono solo permitido tipo STRING.', } )
    @IsOptional()
    readonly telefono?: string;

    @IsString( { message: 'Campo celular solo permitido tipo STRING.', } )
    @IsOptional()
    readonly celular?: string;

    @IsString( { message: 'Campo dirección solo permitido tipo STRING.', } )
    @IsOptional()
    readonly direccion?: string;

    @IsString( { message: 'Campo dirección solo permitido tipo STRING.', } )
    @IsOptional()
    readonly email?: string;

}
