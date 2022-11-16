import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class CreateEstudianteFamiliarDto {

    @IsNotEmpty( { message: 'Campo ID Ciudad Nacimiento es requerido.', } )
    readonly fkidciudadnacimiento: string;

    @IsNotEmpty( { message: 'Campo Ciudad Nacimiento es requerido.', } )
    readonly ciudadnacimiento: string;

    @IsNotEmpty( { message: 'Campo ID Ciudad Residencia es requerido.', } )
    readonly fkidciudadresidencia: string;

    @IsNotEmpty( { message: 'Campo Ciudad Residencia es requerido.', } )
    readonly ciudadresidencia: string;

    @IsNotEmpty( { message: 'Campo ID Tipo Identificación es requerido.', } )
    readonly fkidtipoidentificacion: string;

    @IsNotEmpty( { message: 'Campo Tipo Identificación es requerido.', } )
    readonly tipoidentificacion: string;

    @IsNotEmpty( { message: 'Campo Nro Identificación es requerido.', } )
    readonly numeroidentificacion: string;

    @IsNotEmpty( { message: 'Campo Nombre Principal es requerido.', } )
    readonly nombreprincipal: string;

    @IsOptional()
    readonly nombreadicional?: string;

    @IsOptional()
    readonly apellidoprimero?: string;

    @IsOptional()
    readonly apellidosegundo?: string;

    @IsNotEmpty( { message: 'Campo Género es requerido.', } )
    readonly genero: string;

    @IsOptional()
    readonly email?: string;

    @IsOptional()
    readonly telefono?: string;

    @IsOptional()
    readonly celular?: string;

    @IsOptional()
    readonly fechanacimiento?: string;

    @IsOptional()
    readonly direccion?: string;

    @IsOptional()
    readonly uv?: string;

    @IsOptional()
    readonly manzano?: string;

    @IsOptional()
    readonly barrio?: string;

    @IsNotEmpty( { message: 'Campo Estado Civil es requerido.', } )
    readonly estadocivil?: string;

    @IsOptional()
    readonly imagen?: string;

    @IsOptional()
    readonly tiporelacion?: string;

    @IsOptional()
    readonly profesion?: string;

    @IsIn( [ 'D', 'I', 'N', ], { message: 'Campo Tipo Empleado permite valor: D, I y N', } )
    @IsNotEmpty( { message: 'Campo Tipo Empledo es requerido.', } )
    readonly tipoempleado?: string;

    @IsOptional()
    readonly direccionempresa?: string;

    @IsOptional()
    readonly fkidnivelacademico?: string;

    @IsOptional()
    readonly nivelacademico?: string;

    @IsOptional()
    readonly especialidad?: string;

    @IsOptional()
    readonly tiposangre?: string;

    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
