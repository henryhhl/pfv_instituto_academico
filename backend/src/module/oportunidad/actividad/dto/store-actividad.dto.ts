import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class StoreActividadDto {

    @IsString( { message: 'Campo ID Tipo Actividad solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidtipoactividad: string;

    @IsString( { message: 'Campo Tipo Actividad solo permitido tipo STRING.', } )
    @IsOptional()
    readonly tipoactividad: string;

    @IsString( { message: 'Campo ID Tipo Resultado solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidtiporesultado: string;

    @IsString( { message: 'Campo Tipo Resultado solo permitido tipo STRING.', } )
    @IsOptional()
    readonly tiporesultado: string;


    @IsNotEmpty( { message: 'Campo ID Asesor Responsable es requerido.', } )
    @IsString( { message: 'Campo ID Asesor Responsable solo permitido tipo STRING.', } )
    readonly fkidasesorresponsable: string;

    @IsNotEmpty( { message: 'Campo Asesor Responsable es requerido.', } )
    @IsString( { message: 'Campo Asesor Responsable solo permitido tipo STRING.', } )
    readonly asesorresponsable: string;


    @IsNotEmpty( { message: 'Campo ID Negocio es requerido.', } )
    @IsString( { message: 'Campo ID Negocio solo permitido tipo STRING.', } )
    readonly fkidnegocio: string;

    @IsNotEmpty( { message: 'Campo Descripción es requerido.', } )
    @IsString( { message: 'Campo Descripción solo permitido tipo STRING.', } )
    readonly descripcion: string;

    @IsNotEmpty( { message: 'Campo Nro Actividad es requerido.', } )
    @IsString( { message: 'Campo Nro Actividad solo permitido tipo STRING.', } )
    readonly nroactividad: string;
    

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
