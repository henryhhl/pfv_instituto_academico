import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGrupoDto {
    
    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla solo permitido tipo STRING.', } )
    readonly sigla: string;

}
