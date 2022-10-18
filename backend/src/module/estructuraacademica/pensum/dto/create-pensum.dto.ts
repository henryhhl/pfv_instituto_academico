import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class CreatePensumDto {
    @IsNotEmpty( { message: 'Campo ID Unidad Negocio es requerido.', } )
    @IsString( { message: 'Campo ID Unidad Negocio solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidunidadnegocio: String;

    @IsNotEmpty( { message: 'Campo Unidad Negocio es requerido.', } )
    @IsString( { message: 'Campo Unidad Negocio solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Unidad Negocio debe ser mayor o igual a 1 carácter.', } )
    readonly unidadnegocio: String;

    @IsNotEmpty( { message: 'Campo ID Unidad Administrativa es requerido.', } )
    @IsString( { message: 'Campo ID Unidad Administrativa solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidunidadadministrativa: String;

    @IsNotEmpty( { message: 'Campo Unidad Administrativa es requerido.', } )
    @IsString( { message: 'Campo Unidad Administrativa solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Unidad Administrativa debe ser mayor o igual a 1 carácter.', } )
    readonly unidadadministrativa: String;

    @IsNotEmpty( { message: 'Campo ID Unidad Academica es requerido.', } )
    @IsString( { message: 'Campo ID Unidad Academica solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidunidadacademica: String;

    @IsNotEmpty( { message: 'Campo Unidad Academica es requerido.', } )
    @IsString( { message: 'Campo Unidad Academica solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Unidad Academica debe ser mayor o igual a 1 carácter.', } )
    readonly unidadacademica: String;

    @IsNotEmpty( { message: 'Campo ID Programa es requerido.', } )
    @IsString( { message: 'Campo ID Programa solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidprograma: String;

    @IsNotEmpty( { message: 'Campo Programa es requerido.', } )
    @IsString( { message: 'Campo Programa solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Programa debe ser mayor o igual a 1 carácter.', } )
    readonly programa: String;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: String;

    @IsNotEmpty( { message: 'Campo Fecha Aprobación es requerido.', } )
    @IsString( { message: 'Campo Fecha Aprobación solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Fecha Aprobación debe ser mayor o igual a 1 carácter.', } )
    readonly fechaaprobacion: String;

    @IsNotEmpty( { message: 'Campo Estado Proceso es requerido.', } )
    @IsString( { message: 'Campo Estado Proceso solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado Proceso debe ser mayor o igual a 1 carácter.', } )
    readonly estadoproceso: String;

}
