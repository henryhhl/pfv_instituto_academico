import { IsString, MinLength } from 'class-validator';

export class CreateMateriaDto {

    @IsString( { message: 'Campo código es requerido.', } )
    @MinLength(1, { message: 'Campo código debe ser mayor o igual a 1 carácter.', })
    readonly codigo: string;

    @IsString( { message: 'Campo sigla es requerido.', } )
    @MinLength(1, { message: 'Campo sigla debe ser mayor o igual a 1 carácter.', })
    readonly sigla: string;
    
    @IsString( { message: 'Campo nombre largo es requerido.', } )
    @MinLength(1, { message: 'Campo nombre largo debe ser mayor o igual a 1 carácter.', })
    readonly nombrelargo: string;

    @IsString( { message: 'Campo nombre corto es requerido.', } )
    @MinLength(1, { message: 'Campo nombre corto debe ser mayor o igual a 1 carácter.', })
    readonly nombrecorto: string;

    @IsString( { message: 'Campo nombre alternativo es requerido.', } )
    @MinLength(1, { message: 'Campo nombre alternativo debe ser mayor o igual a 1 carácter.', })
    readonly nombrealternativo: string;

    @IsString( { message: 'Campo créditos es requerido.', } )
    @MinLength(1, { message: 'Campo créditos debe ser mayor o igual a 1 carácter.', })
    readonly creditos: string;

}
