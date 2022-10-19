import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateReferenciaContactoDto {

    @IsNotEmpty( { message: 'Campo Descripción es requerido.', } )
    @IsString( { message: 'Campo Descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

    // @IsNotEmpty( { message: 'Campo Tipo es requerido.', } )
    // @IsString( { message: 'Campo Tipo solo permitido tipo STRING.', } )
    // @MinLength(1, { message: 'Campo Tipo debe ser mayor o igual a 1 carácter.', } )
    // readonly tiporeferenciacontacto: string;

}
