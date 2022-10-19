import { IsString, MinLength } from 'class-validator';

export class CreateRolDto {

    @IsString( { message: 'Campo ID Tipo Rol es requerido.', } )
    readonly fkidtiporol: string;

    @IsString( { message: 'Campo Tipo Rol es requerido.', } )
    readonly tiporol: string;

    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(2)
    readonly descripcion: string;

    @IsString( { message: 'Campo Nota es requerido.', } )
    readonly nota: string;

}
