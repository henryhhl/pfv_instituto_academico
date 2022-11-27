import { IsNotEmpty, IsString, IsInt, Min, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCursoDocenteDetalleDto } from './create-docente.dto';

export class CreateCursoDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateCursoDocenteDetalleDto )
    @IsOptional()
    readonly arraydocente?: CreateCursoDocenteDetalleDto[];

    @IsNotEmpty( { message: 'Campo ID UNIDAD NEGOCIO es requerido.', } )
    @IsString( { message: 'Campo ID UNIDAD NEGOCIO solo permitido tipo STRING.', } )
    readonly fkidunidadnegocio: string;

    @IsNotEmpty( { message: 'Campo UNIDAD NEGOCIO es requerido.', } )
    @IsString( { message: 'Campo UNIDAD NEGOCIO solo permitido tipo STRING.', } )
    readonly unidadnegocio: string;

    @IsNotEmpty( { message: 'Campo ID UNIDAD ADMINISTRATIVA es requerido.', } )
    @IsString( { message: 'Campo ID UNIDAD ADMINISTRATIVA solo permitido tipo STRING.', } )
    readonly fkidunidadadministrativa: string;

    @IsNotEmpty( { message: 'Campo UNIDAD ADMINISTRATIVA es requerido.', } )
    @IsString( { message: 'Campo UNIDAD ADMINISTRATIVA solo permitido tipo STRING.', } )
    readonly unidadadministrativa: string;

    @IsNotEmpty( { message: 'Campo ID UNIDAD ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo ID UNIDAD ACADEMICA solo permitido tipo STRING.', } )
    readonly fkidunidadacademica: string;

    @IsNotEmpty( { message: 'Campo UNIDAD ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo UNIDAD ACADEMICA solo permitido tipo STRING.', } )
    readonly unidadacademica: string;

    @IsNotEmpty( { message: 'Campo ID MODALIDAD ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo ID MODALIDAD ACADEMICA solo permitido tipo STRING.', } )
    readonly fkidmodalidadacademica: string;

    @IsNotEmpty( { message: 'Campo MODALIDAD ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo MODALIDAD ACADEMICA solo permitido tipo STRING.', } )
    readonly modalidadacademica: string;

    @IsNotEmpty( { message: 'Campo ID TURNO es requerido.', } )
    @IsString( { message: 'Campo ID TURNO solo permitido tipo STRING.', } )
    readonly fkidturno: string;

    @IsNotEmpty( { message: 'Campo TURNO es requerido.', } )
    @IsString( { message: 'Campo TURNO solo permitido tipo STRING.', } )
    readonly turno: string;

    @IsNotEmpty( { message: 'Campo ID MATERIA es requerido.', } )
    @IsString( { message: 'Campo ID MATERIA solo permitido tipo STRING.', } )
    readonly fkidmateria: string;

    @IsNotEmpty( { message: 'Campo MATERIA es requerido.', } )
    @IsString( { message: 'Campo MATERIA solo permitido tipo STRING.', } )
    readonly materia: string;

    @IsNotEmpty( { message: 'Campo GESTION PERIODO es requerido.', } )
    @IsString( { message: 'Campo GESTION PERIODO solo permitido tipo STRING.', } )
    readonly fkidgestionperiodo: string;

    @IsNotEmpty( { message: 'Campo GESTION PERIODO es requerido.', } )
    @IsString( { message: 'Campo GESTION PERIODO solo permitido tipo STRING.', } )
    readonly gestionperiodo: string;

    @IsNotEmpty( { message: 'Campo SIGLA es requerido.', } )
    @IsString( { message: 'Campo SIGLA solo permitido tipo STRING.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo DESCRIPCION es requerido.', } )
    @IsString( { message: 'Campo DESCRIPCION solo permitido tipo STRING.', } )
    readonly descripcion: string;

    @IsNotEmpty( { message: 'Campo CUPO es requerido.', } )
    @IsInt( { message: 'Campo CUPO solo permitido tipo ENTERO.', } )
    @Min(0, { message: 'Campo CUPO es requerido mínimo 0' } )
    @Type( () => Number )
    readonly cupo: number;

    @IsNotEmpty( { message: 'Campo FECHA INICIO es requerido.', } )
    @IsString( { message: 'Campo FECHA INICIO solo permitido tipo STRING.', } )
    readonly fechainicio: string;

    @IsNotEmpty( { message: 'Campo FECHA FINAL es requerido.', } )
    @IsString( { message: 'Campo FECHA FINAL solo permitido tipo STRING.', } )
    readonly fechafinal: string;

    @IsString( { message: 'Campo PRE REQUISITO solo permitido tipo STRING.', } )
    @IsOptional()
    readonly prerequisito: string;

    @IsString( { message: 'Campo OBJETIVO solo permitido tipo STRING.', } )
    @IsOptional()
    readonly objetivo: string;

    @IsNotEmpty( { message: 'Campo CANTIDAD HORA es requerido.', } )
    @IsInt( { message: 'Campo CANTIDAD HORA solo permitido tipo ENTERO.', } )
    @Min(0, { message: 'Campo CANTIDAD HORA es requerido mínimo 0' } )
    @Type( () => Number )
    readonly cantidadhora: number;

    @IsNotEmpty( { message: 'Campo INVERSION BASE es requerido.', } )
    // @IsNumber( { message: 'Campo INVERSION BASE solo permitido tipo ENTERO.', } )
    @Min(0, { message: 'Campo INVERSION BASE es requerido mínimo 0' } )
    @Type( () => Number )
    readonly inversionbase: number;

}
