import { IsOptional, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateCursoDocenteDetalleDto {

    @IsNotEmpty( { message: 'Campo ID DOCENTE es requerido.', } )
    @IsString( { message: 'Campo ID DOCENTE solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkiddocente?: string;

    @IsNotEmpty( { message: 'Campo DOCENTE es requerido.', } )
    @IsString( { message: 'Campo DOCENTE solo permitido tipo STRING.', } )
    @IsOptional()
    readonly docente?: string;

    @IsOptional()
    readonly contenido?: string;

    @IsIn( [ 'A', 'N', ], { message: 'Campo ESTADO permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
