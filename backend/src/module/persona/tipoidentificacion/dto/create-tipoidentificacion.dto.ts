import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTipoIdentificacionDto {

    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla solo permitido tipo STRING.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    readonly descripcion: string;

    @IsOptional()
    readonly x_fecha?: string;

    @IsOptional()
    readonly x_hora?: string;

}
