import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsInt, Min, IsOptional } from 'class-validator';


export class CreateGestionPeriodoDto {

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

    @IsInt( { message: 'Campo Orden solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo Orden es requerido minimo 0' } )
    @Type( () => Number )
    @IsOptional()
    readonly orden?: number;

    @IsNotEmpty( { message: 'Campo Fecha Inicio es requerido.', } )
    @IsString( { message: 'Campo Fecha Inicio solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Fecha Inicio debe ser mayor o igual a 1 carácter.', } )
    readonly fechainicio: string;

    @IsNotEmpty( { message: 'Campo Fecha Final es requerido.', } )
    @IsString( { message: 'Campo Fecha Final solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Fecha Final debe ser mayor o igual a 1 carácter.', } )
    readonly fechafinal: string;

}
