import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAulaDto {

    @IsNotEmpty( { message: 'Campo ID Unidad Administrativa es requerido.', } )
    @IsString( { message: 'Campo ID Unidad Administrativa solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo ID Unidad Administrativa debe ser mayor o igual a 1 carácter.', } )
    readonly fkidunidadadministrativa: string;

    @IsNotEmpty( { message: 'Campo Unidad Administrativa es requerido.', } )
    @IsString( { message: 'Campo Unidad Administrativa solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Unidad Administrativa debe ser mayor o igual a 1 carácter.', } )
    readonly unidadadministrativa: string;

    @IsNotEmpty( { message: 'Campo Sigla es requerido.', } )
    @IsString( { message: 'Campo Sigla solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Sigla debe ser mayor o igual a 1 carácter.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

    @IsNotEmpty( { message: 'Campo cupo es requerido.', } )
    @IsInt( { message: 'Campo cupo solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo cupo es requerido minimo 0' } )
    @Type( () => Number )
    readonly cupo: number;

}
