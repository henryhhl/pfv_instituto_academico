import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUsuarioRolDetalleDto {

    @IsNotEmpty( { message: 'Campo ID USUARIO es requerido.', } )
    @IsString( { message: 'Campo ID USUARIO solo permitido tipo STRING.', } )
    readonly fkidusuario: String;

    @IsNotEmpty( { message: 'Campo ID ROL es requerido.', } )
    @IsString( { message: 'Campo ID ROL solo permitido tipo STRING.', } )
    readonly fkidrol: String;

    @IsNotEmpty( { message: 'Campo Rol es requerido.', } )
    @IsString( { message: 'Campo Rol solo permitido tipo STRING.', } )
    readonly rol: String;

    @IsNotEmpty( { message: 'Campo Tipo Rol es requerido.', } )
    @IsString( { message: 'Campo Tipo Rol solo permitido tipo STRING.', } )
    readonly tiporol: String;

    @IsString( { message: 'Campo Nota Rol solo permitido tipo STRING.', } )
    @IsOptional()
    readonly notarol: String;

}
