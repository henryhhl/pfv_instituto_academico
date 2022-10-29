import { IsNotEmpty, IsString, MinLength, IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDivisionAcademicaDto {

    @IsNotEmpty( { message: 'Campo Sigla es requerido.', } )
    @IsString( { message: 'Campo Sigla solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Sigla debe ser mayor o igual a 1 carácter.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

    @IsInt( { message: 'Campo Orden solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo Orden es requerido minimo 0' } )
    @Type( () => Number )
    @IsOptional()
    readonly orden?: number;

}
