import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAsesorResponsableDto {

    @IsNotEmpty( { message: 'Campo valor procentaje es requerido.', } )
    @IsInt( { message: 'Campo valor procentaje solo permitido tipo ENTERO.', } )
    @Min(0, { message: 'Campo valor procentaje es requerido mínimo 0' } )
    @Type( () => Number )
    readonly valorporcentaje: number;

    @IsNotEmpty( { message: 'Campo Comision es requerido.', } )
    @IsString( { message: 'Campo Comision solo permitido tipo STRING.', } )
    readonly comision: string;

    @IsNotEmpty( { message: 'Campo ID Tipo Identificación es requerido.', } )
    @IsString( { message: 'Campo ID Tipo Identificación solo permitido tipo STRING.', } )
    readonly fkidtipoidentificacion: string;

    @IsNotEmpty( { message: 'Campo Tipo Identificación es requerido.', } )
    @IsString( { message: 'Campo Tipo Identificación solo permitido tipo STRING.', } )
    readonly tipoidentificacion: string;

    @IsNotEmpty( { message: 'Campo ID Ciudad Nacimiento es requerido.', } )
    @IsString( { message: 'Campo ID Ciudad Nacimiento solo permitido tipo STRING.', } )
    readonly fkidciudadnacimiento: string;

    @IsNotEmpty( { message: 'Campo Ciudad Nacimiento es requerido.', } )
    @IsString( { message: 'Campo Ciudad Nacimiento solo permitido tipo STRING.', } )
    readonly ciudadnacimiento: string;

    @IsNotEmpty( { message: 'Campo ID Ciudad Residencia es requerido.', } )
    @IsString( { message: 'Campo ID Ciudad Residencia solo permitido tipo STRING.', } )
    readonly fkidciudadresidencia: string;

    @IsNotEmpty( { message: 'Campo Ciudad Residencia es requerido.', } )
    @IsString( { message: 'Campo Ciudad Residencia solo permitido tipo STRING.', } )
    readonly ciudadresidencia: string;

    @IsNotEmpty( { message: 'Campo Nombre Principal es requerido.', } )
    @IsString( { message: 'Campo Nombre Principal solo permitido tipo STRING.', } )
    readonly nombreprincipal: string;

    @IsString( { message: 'Campo Nombre Adicional solo permitido tipo STRING.', } )
    @IsOptional()
    readonly nombreadicional: string;

    @IsNotEmpty( { message: 'Campo Primer Apellido es requerido.', } )
    @IsString( { message: 'Campo Primer Apellido solo permitido tipo STRING.', } )
    readonly apellidoprimero: string;

    @IsString( { message: 'Campo Segundo Apellido solo permitido tipo STRING.', } )
    @IsOptional()
    readonly apellidosegundo: string;

    @IsNotEmpty( { message: 'Campo Nro. Identificación es requerido.', } )
    @IsString( { message: 'Campo Nro. Identificación solo permitido tipo STRING.', } )
    readonly numeroidentificacion: string;

    @IsNotEmpty( { message: 'Campo género es requerido.', } )
    @IsString( { message: 'Campo género solo permitido tipo STRING.', } )
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
    readonly estadocivil: string;

    @IsString( { message: 'Campo Imagen solo permitido tipo STRING.', } )
    @IsOptional()
    readonly imagen?: string;

}
