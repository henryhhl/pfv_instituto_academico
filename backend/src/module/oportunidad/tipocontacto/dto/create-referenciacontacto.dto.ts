import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReferenciaContactoDto {

    @IsNotEmpty( { message: 'Campo Sigla es requerido.', } )
    @IsString( { message: 'Campo Sigla solo permitido tipo STRING.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo Descripción es requerido.', } )
    @IsString( { message: 'Campo Descripción solo permitido tipo STRING.', } )
    readonly descripcion: string;

}
