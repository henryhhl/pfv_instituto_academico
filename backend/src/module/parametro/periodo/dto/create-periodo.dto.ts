import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreatePeriodoDto {

    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla es requerido.', } )
    @MinLength(1, { message: 'Campo sigla debe ser mayor o igual a 1 carácter.', })
    readonly sigla: string;
    
    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', })
    readonly descripcion: string;

}
