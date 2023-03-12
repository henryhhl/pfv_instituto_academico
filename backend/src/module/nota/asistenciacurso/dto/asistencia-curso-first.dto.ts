import { IsNotEmpty, IsString } from 'class-validator';

export class AsistenciaCursoFirstDto {

    @IsNotEmpty( { message: 'Campo idasistenciacurso es requerido.', } )
    @IsString( { message: 'Campo idasistenciacurso solo permitido tipo STRING.', } )
    readonly idasistenciacurso?: string;

    @IsNotEmpty( { message: 'Campo asistencia es requerido.', } )
    @IsString( { message: 'Campo asistencia solo permitido tipo STRING.', } )
    readonly asistencia?: string;

}
