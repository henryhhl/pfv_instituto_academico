import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateActividadDto {

    @IsNotEmpty( { message: 'Campo ID Tipo Actividad es requerido.', } )
    @IsString( { message: 'Campo ID Tipo Actividad solo permitido tipo STRING.', } )
    readonly fkidtipoactividad: string;

    @IsNotEmpty( { message: 'Campo Tipo Actividad es requerido.', } )
    @IsString( { message: 'Campo Tipo Actividad solo permitido tipo STRING.', } )
    readonly tipoactividad: string;


    @IsNotEmpty( { message: 'Campo ID Asesor Responsable es requerido.', } )
    @IsString( { message: 'Campo ID Asesor Responsable solo permitido tipo STRING.', } )
    readonly fkidasesorresponsable: string;

    @IsNotEmpty( { message: 'Campo Asesor Responsable es requerido.', } )
    @IsString( { message: 'Campo Asesor Responsable solo permitido tipo STRING.', } )
    readonly asesorresponsable: string;


    @IsNotEmpty( { message: 'Campo ID Estado Negocio es requerido.', } )
    @IsString( { message: 'Campo ID Estado Negocio solo permitido tipo STRING.', } )
    readonly fkidestadonegocio: string;

    @IsNotEmpty( { message: 'Campo Estado Negocio es requerido.', } )
    @IsString( { message: 'Campo Estado Negocio solo permitido tipo STRING.', } )
    readonly estadonegocio: string;


    @IsNotEmpty( { message: 'Campo ID Negocio es requerido.', } )
    @IsString( { message: 'Campo ID Negocio solo permitido tipo STRING.', } )
    readonly fkidnegocio: string;

    @IsNotEmpty( { message: 'Campo Negocio es requerido.', } )
    @IsString( { message: 'Campo Negocio solo permitido tipo STRING.', } )
    readonly negocio: string;

    @IsNotEmpty( { message: 'Campo Fecha Programada es requerido.', } )
    @IsString( { message: 'Campo Fecha Programada solo permitido tipo STRING.', } )
    readonly fechaprogramada: string;

    @IsNotEmpty( { message: 'Campo Hora Programada es requerido.', } )
    @IsString( { message: 'Campo Hora Programada solo permitido tipo STRING.', } )
    readonly horaprogramada: string;

    @IsString( { message: 'Campo Nota solo permitido tipo STRING.', } )
    @IsOptional()
    readonly nota: string;

    @IsString( { message: 'Campo Fecha Cierre solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fechacierre: string;

    @IsString( { message: 'Campo Resultado solo permitido tipo STRING.', } )
    @IsOptional()
    readonly resultado: string;

}
