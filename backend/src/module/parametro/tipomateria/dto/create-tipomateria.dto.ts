
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateTipoMateriaDto {

    @IsNotEmpty( { message: 'Campo Sigla es requerido.', } )
    @IsString( { message: 'Campo Sigla es requerido.', } )
    @MinLength(1, { message: 'Campo Sigla debe ser mayor o igual a 1 carácter.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo Descripción es requerido.', } )
    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(1, { message: 'Campo Descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;
}
