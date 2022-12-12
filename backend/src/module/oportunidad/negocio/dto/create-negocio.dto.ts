import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNegocioDto {

    @IsNotEmpty( { message: 'Campo ID Oportunidad es requerido.', } )
    @IsString( { message: 'Campo ID Oportunidad solo permitido tipo STRING.', } )
    readonly fkidoportunidad: string;

}