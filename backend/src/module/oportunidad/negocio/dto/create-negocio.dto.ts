import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNegocioDto {

    @IsNotEmpty( { message: 'Campo ID Programa es requerido.', } )
    @IsString( { message: 'Campo ID Programa solo permitido tipo STRING.', } )
    readonly fkidprograma: string;

    @IsNotEmpty( { message: 'Campo Programa es requerido.', } )
    @IsString( { message: 'Campo Programa solo permitido tipo STRING.', } )
    readonly programa: string;


    @IsNotEmpty( { message: 'Campo ID Turno es requerido.', } )
    @IsString( { message: 'Campo ID Turno solo permitido tipo STRING.', } )
    readonly fkidturno: string;

    @IsNotEmpty( { message: 'Campo Turno es requerido.', } )
    @IsString( { message: 'Campo Turno solo permitido tipo STRING.', } )
    readonly turno: string;


    @IsNotEmpty( { message: 'Campo ID Estado Negocio es requerido.', } )
    @IsString( { message: 'Campo ID Estado Negocio solo permitido tipo STRING.', } )
    readonly fkidestadonegocio: string;

    @IsNotEmpty( { message: 'Campo Estado Negocio es requerido.', } )
    @IsString( { message: 'Campo Estado Negocio solo permitido tipo STRING.', } )
    readonly estadonegocio: string;


    @IsNotEmpty( { message: 'Campo Identificacion es requerido.', } )
    @IsString( { message: 'Campo Identificacion solo permitido tipo STRING.', } )
    readonly fkidoportunidad: string;

    @IsNotEmpty( { message: 'Campo ID Oportunidad es requerido.', } )
    @IsString( { message: 'Campo ID Oportunidad solo permitido tipo STRING.', } )
    readonly oportunidad: string;

    @IsNotEmpty( { message: 'Campo Fecha Inicio es requerido.', } )
    @IsString( { message: 'Campo Fecha Inicio solo permitido tipo STRING.', } )
    readonly fechainicio: string;

    @IsNotEmpty( { message: 'Campo Fecha Cierre es requerido.', } )
    @IsString( { message: 'Campo Fecha Cierre solo permitido tipo STRING.', } )
    readonly fechacierre: string;

}
