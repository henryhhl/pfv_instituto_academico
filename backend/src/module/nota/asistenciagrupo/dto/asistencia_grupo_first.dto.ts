import { IsNotEmpty, IsString } from 'class-validator';

export class AsistenciaGrupoFirstDto {

    @IsNotEmpty( { message: 'Campo idasistenciagrupo es requerido.', } )
    @IsString( { message: 'Campo idasistenciagrupo solo permitido tipo STRING.', } )
    readonly idasistenciagrupo?: string;

    @IsNotEmpty( { message: 'Campo asistencia es requerido.', } )
    @IsString( { message: 'Campo asistencia solo permitido tipo STRING.', } )
    readonly asistencia?: string;

}
