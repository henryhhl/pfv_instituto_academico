import { IsNotEmpty, IsString, IsInt, Min, MinLength, IsIn, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateParametrocalificacionDto {

    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla solo permitido tipo STRING.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    readonly descripcion: string;

    @IsNotEmpty( { message: 'Campo valor procentaje es requerido.', } )
    @IsInt( { message: 'Campo valor procentaje solo permitido tipo ENTERO.', } )
    @Min(0, { message: 'Campo valor procentaje es requerido mínimo 0' } )
    @Type( () => Number )
    readonly valorporcentaje: number;

    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
