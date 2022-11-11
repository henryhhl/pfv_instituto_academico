import { IsNotEmpty, IsOptional, IsString, MinLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMateriaDetalleDto } from './create-materia.dto';
import { CreateNacionalidadDto } from './create-nacionalidad.dto';
import { CreateDocenteEstudioDetalleDto } from './create-estudio.dto';
import { CreateDocenteCategoriaDocumentoDetalleDto } from './create-categoriadocumento.dto';

export class CreateDocenteDto {

    @IsNotEmpty( { message: 'Campo ID Tipo Identificación es requerido.', } )
    @IsString( { message: 'Campo ID Tipo Identificación solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo ID Tipo Identificación debe ser mayor o igual a 1 carácter.', } )
    readonly fkidtipoidentificacion: string;

    @IsNotEmpty( { message: 'Campo Tipo Identificación es requerido.', } )
    @IsString( { message: 'Campo Tipo Identificación solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Tipo Identificación debe ser mayor o igual a 1 carácter.', } )
    readonly tipoidentificacion: string;

    @IsNotEmpty( { message: 'Campo ID Ciudad Nacimiento es requerido.', } )
    @IsString( { message: 'Campo ID Ciudad Nacimiento solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo ID Ciudad Nacimiento debe ser mayor o igual a 1 carácter.', } )
    readonly fkidciudadnacimiento: string;

    @IsNotEmpty( { message: 'Campo Ciudad Nacimiento es requerido.', } )
    @IsString( { message: 'Campo Ciudad Nacimiento solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Ciudad Nacimiento debe ser mayor o igual a 1 carácter.', } )
    readonly ciudadnacimiento: string;

    @IsNotEmpty( { message: 'Campo ID Ciudad Residencia es requerido.', } )
    @IsString( { message: 'Campo ID Ciudad Residencia solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo ID Ciudad Residencia debe ser mayor o igual a 1 carácter.', } )
    readonly fkidciudadresidencia: string;

    @IsNotEmpty( { message: 'Campo Ciudad Residencia es requerido.', } )
    @IsString( { message: 'Campo Ciudad Residencia solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Ciudad Residencia debe ser mayor o igual a 1 carácter.', } )
    readonly ciudadresidencia: string;

    @IsString( { each: true, } )
    @IsArray()
    @IsOptional()
    readonly arrayreferenciacontactos?: [];

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateNacionalidadDto )
    @IsOptional()
    readonly arraynacionalidad?: CreateNacionalidadDto[];

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateMateriaDetalleDto )
    @IsOptional()
    readonly arraymateria?: CreateMateriaDetalleDto[];

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateDocenteCategoriaDocumentoDetalleDto )
    @IsOptional()
    readonly arraycategoriadocumento?: CreateDocenteCategoriaDocumentoDetalleDto[];

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateDocenteEstudioDetalleDto )
    @IsOptional()
    readonly arrayestudio?: CreateDocenteEstudioDetalleDto[];

    @IsNotEmpty( { message: 'Campo Nombre Principal es requerido.', } )
    @IsString( { message: 'Campo Nombre Principal solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Nombre Principal debe ser mayor o igual a 1 carácter.', } )
    readonly nombreprincipal: string;

    @IsString( { message: 'Campo Nombre Adicional solo permitido tipo STRING.', } )
    @IsOptional()
    readonly nombreadicional: string;

    @IsNotEmpty( { message: 'Campo Primer Apellido es requerido.', } )
    @IsString( { message: 'Campo Primer Apellido solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Primer Apellido debe ser mayor o igual a 1 carácter.', } )
    readonly apellidoprimero: string;

    @IsString( { message: 'Campo Segundo Apellido solo permitido tipo STRING.', } )
    @IsOptional()
    readonly apellidosegundo: string;

    @IsNotEmpty( { message: 'Campo Nro. Identificación es requerido.', } )
    @IsString( { message: 'Campo Nro. Identificación solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Nro. Identificación debe ser mayor o igual a 1 carácter.', } )
    readonly numeroidentificacion: string;

    @IsNotEmpty( { message: 'Campo género es requerido.', } )
    @IsString( { message: 'Campo género solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo género debe ser mayor o igual a 1 carácter.', } )
    readonly genero: string;

    @IsString( { message: 'Campo email solo permitido tipo STRING.', } )
    @IsOptional()
    readonly email?: string;

    @IsString( { message: 'Campo Télefono solo permitido tipo STRING.', } )
    @IsOptional()
    readonly telefono?: string;

    @IsString( { message: 'Campo Celular solo permitido tipo STRING.', } )
    @IsOptional()
    readonly celular?: string;

    @IsNotEmpty( { message: 'Campo Fecha Nacimiento es requerido.', } )
    @IsString( { message: 'Campo Fecha Nacimiento solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Fecha Nacimiento debe ser mayor o igual a 1 carácter.', } )
    readonly fechanacimiento: string;

    @IsString( { message: 'Campo Dirección solo permitido tipo STRING.', } )
    @IsOptional()
    readonly direccion?: string;

    @IsString( { message: 'Campo UV solo permitido tipo STRING.', } )
    @IsOptional()
    readonly uv?: string;

    @IsString( { message: 'Campo Manzano solo permitido tipo STRING.', } )
    @IsOptional()
    readonly manzano?: string;

    @IsString( { message: 'Campo Barrio solo permitido tipo STRING.', } )
    @IsOptional()
    readonly barrio?: string;

    @IsNotEmpty( { message: 'Campo Estado Civil es requerido.', } )
    @IsString( { message: 'Campo Estado Civil solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado Civil debe ser mayor o igual a 1 carácter.', } )
    readonly estadocivil: string;

    @IsString( { message: 'Campo Imagen solo permitido tipo STRING.', } )
    @IsOptional()
    readonly imagen?: string;

}
