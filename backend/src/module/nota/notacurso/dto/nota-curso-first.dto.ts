import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class NotaCursoFirstDto {

    @IsNotEmpty( { message: 'Campo idnotacurso es requerido.', } )
    @IsString( { message: 'Campo idnotacurso solo permitido tipo STRING.', } )
    readonly idnotacurso?: string;

    @IsNotEmpty( { message: 'Campo nota es requerido.', } )
    @IsInt( { message: 'Campo nota solo permitido tipo ENTERO.', } )
    @Min(0, { message: 'Campo nota es requerido mínimo 0' } )
    @Type( () => Number )
    readonly nota?: number;

}
