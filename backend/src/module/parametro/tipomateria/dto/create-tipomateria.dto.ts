
import { IsString, MinLength } from 'class-validator';

export class CreateTipoMateriaDto {

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(1)
    readonly sigla: string;

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(2)
    readonly descripcion: string;
}
