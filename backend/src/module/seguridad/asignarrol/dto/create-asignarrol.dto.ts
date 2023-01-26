import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAsignarRolDto {

    @IsNotEmpty( { message: 'Campo fkidusuario es requerido.', } )
    @IsString( { message: 'Campo fkidusuario solo permitido tipo STRING.', } )
    readonly fkidusuario: string;

    @IsNotEmpty( { message: 'Campo fkidrol es requerido.', } )
    @IsString( { message: 'Campo fkidrol solo permitido tipo STRING.', } )
    readonly fkidrol: string;

}
