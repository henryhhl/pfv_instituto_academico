import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateResponsableUnidadAcademicaDetalleDto {

    @IsNotEmpty( { message: 'Campo Fecha Inicio es requerido.', } )
    @IsString( { message: 'Campo Fecha Inicio solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Fecha Inicio debe ser mayor o igual a 1 carácter.', } )
    readonly fechainicio: string;

}
