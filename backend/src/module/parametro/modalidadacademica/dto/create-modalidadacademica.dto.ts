import { IsString, MinLength } from 'class-validator';

export class CreateModalidadAcademicaDto {

    @IsString( { message: 'Campo sigla es requerido.', } )
    @MinLength(1, { message: 'Campo sigla debe ser mayor o igual a 1 carácter.', })
    readonly sigla: string;
    
    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', })
    readonly descripcion: string;

}
