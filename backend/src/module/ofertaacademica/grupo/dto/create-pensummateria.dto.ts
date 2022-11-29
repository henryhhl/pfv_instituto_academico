import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGrupoPensumMateriaDetalleDto {

    @IsNotEmpty( { message: 'Campo ID UNIDAD ADMINISTRATIVA es requerido.', } )
    @IsString( { message: 'Campo ID UNIDAD ADMINISTRATIVA solo permitido tipo STRING.', } )
    readonly fkidunidadadministrativa?: string;

    @IsNotEmpty( { message: 'Campo UNIDAD ADMINISTRATIVA es requerido.', } )
    @IsString( { message: 'Campo UNIDAD ADMINISTRATIVA solo permitido tipo STRING.', } )
    readonly unidadadministrativa?: string;

    @IsNotEmpty( { message: 'Campo ID UNIDAD ADMINISTRATIVA es requerido.', } )
    @IsString( { message: 'Campo ID UNIDAD ADMINISTRATIVA solo permitido tipo STRING.', } )
    readonly fkidunidadnegocio?: string;

    @IsNotEmpty( { message: 'Campo UNIDAD NEGOCIO es requerido.', } )
    @IsString( { message: 'Campo UNIDAD NEGOCIO solo permitido tipo STRING.', } )
    readonly unidadnegocio?: string;

    @IsNotEmpty( { message: 'Campo ID UNIDAD ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo ID UNIDAD ACADEMICA solo permitido tipo STRING.', } )
    readonly fkidunidadacademica?: string;

    @IsNotEmpty( { message: 'Campo UNIDAD ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo UNIDAD ACADEMICA solo permitido tipo STRING.', } )
    readonly unidadacademica?: string;

    @IsNotEmpty( { message: 'Campo ID PROGRAMA es requerido.', } )
    @IsString( { message: 'Campo ID PROGRAMA solo permitido tipo STRING.', } )
    readonly fkidprograma?: string;

    @IsNotEmpty( { message: 'Campo PROGRAMA es requerido.', } )
    @IsString( { message: 'Campo PROGRAMA solo permitido tipo STRING.', } )
    readonly programa?: string;

    @IsNotEmpty( { message: 'Campo ID PENSUM es requerido.', } )
    @IsString( { message: 'Campo ID PENSUM solo permitido tipo STRING.', } )
    readonly fkidpensum?: string;

    @IsNotEmpty( { message: 'Campo PENSUM es requerido.', } )
    @IsString( { message: 'Campo PENSUM solo permitido tipo STRING.', } )
    readonly pensum?: string;

    @IsNotEmpty( { message: 'Campo ID DOCENTE es requerido.', } )
    @IsString( { message: 'Campo ID DOCENTE solo permitido tipo STRING.', } )
    readonly fkiddocente?: string;

    @IsNotEmpty( { message: 'Campo DOCENTE es requerido.', } )
    @IsString( { message: 'Campo DOCENTE solo permitido tipo STRING.', } )
    readonly docente?: string;

    @IsNotEmpty( { message: 'Campo ID TURNO es requerido.', } )
    @IsString( { message: 'Campo ID TURNO solo permitido tipo STRING.', } )
    readonly fkidturno?: string;

    @IsNotEmpty( { message: 'Campo TURNO es requerido.', } )
    @IsString( { message: 'Campo TURNO solo permitido tipo STRING.', } )
    readonly turno?: string;

    @IsNotEmpty( { message: 'Campo ID GESTION PERIODO es requerido.', } )
    @IsString( { message: 'Campo ID GESTION PERIODO solo permitido tipo STRING.', } )
    readonly fkidgestionperiodo?: string;

    @IsNotEmpty( { message: 'Campo GESTION PERIODO es requerido.', } )
    @IsString( { message: 'Campo GESTION PERIODO solo permitido tipo STRING.', } )
    readonly gestionperiodo?: string;

    @IsNotEmpty( { message: 'Campo ID MATERIA es requerido.', } )
    @IsString( { message: 'Campo ID MATERIA solo permitido tipo STRING.', } )
    readonly fkidmateria?: string;

    @IsNotEmpty( { message: 'Campo MATERIA es requerido.', } )
    @IsString( { message: 'Campo MATERIA solo permitido tipo STRING.', } )
    readonly materia?: string;

    @IsNotEmpty( { message: 'Campo ID DIVISION ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo ID DIVISION ACADEMICA solo permitido tipo STRING.', } )
    readonly fkiddivisionacademica?: string;

    @IsNotEmpty( { message: 'Campo DIVISION ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo DIVISION ACADEMICA solo permitido tipo STRING.', } )
    readonly divisionacademica?: string;

    @IsNotEmpty( { message: 'Campo CUPO MÁXIMO es requerido.', } )
    @IsInt( { message: 'Campo CUPO MÁXIMO solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo CUPO MÁXIMO es requerido mínimo 0' } )
    @Type( () => Number )
    readonly cupomaximo?: number;

}
