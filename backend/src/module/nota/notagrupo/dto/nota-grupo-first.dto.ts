import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class NotaGrupoFirstDto {

    @IsNotEmpty( { message: 'Campo idnotagrupo es requerido.', } )
    @IsString( { message: 'Campo idnotagrupo solo permitido tipo STRING.', } )
    readonly idnotagrupo?: string;

    @IsNotEmpty( { message: 'Campo nota es requerido.', } )
    @IsInt( { message: 'Campo nota solo permitido tipo ENTERO.', } )
    @Min(0, { message: 'Campo nota es requerido mínimo 0' } )
    @Type( () => Number )
    readonly nota?: number;

    @IsNotEmpty( { message: 'Campo calificacion es requerido.', } )
    @IsInt( { message: 'Campo calificacion solo permitido tipo ENTERO.', } )
    @Min(0, { message: 'Campo calificacion es requerido mínimo 0' } )
    @Type( () => Number )
    readonly calificacion?: number;

}
