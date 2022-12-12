import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActividadDto {

    @IsNotEmpty( { message: 'Campo ID Negocio es requerido.', } )
    @IsString( { message: 'Campo ID Negocio solo permitido tipo STRING.', } )
    readonly fkidnegocio: string;

}