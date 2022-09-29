import { IsString, MinLength } from 'class-validator';

export class CreateRolDto {

    @IsString( { message: 'La descripción es requerido.', } )
    readonly fkidtiporol: string;

    @IsString( { message: 'La descripción es requerido.', } )
    readonly tiporol: string;

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(2)
    readonly descripcion: string;

    @IsString( { message: 'La descripción es requerido.', } )
    readonly nota: string;

}
