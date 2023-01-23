import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, Min, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { CreateDiaDto } from './create-grupomateriadia.dto';
import { CreateGrupoMateriaCalificacionDto } from './create-grupomateriacalificacion.dto';

export class CreateGrupoMateriaDetalleDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateDiaDto )
    @IsOptional()
    readonly arraydia?: CreateDiaDto[];

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateGrupoMateriaCalificacionDto )
    @IsOptional()
    readonly arrayparametrocalificacion?: CreateGrupoMateriaCalificacionDto[];

    @IsNotEmpty( { message: 'Campo ID UNIDAD ADMINISTRATIVA es requerido.', } )
    @IsString( { message: 'Campo ID UNIDAD ADMINISTRATIVA solo permitido tipo STRING.', } )
    readonly fkidunidadadministrativa?: string;

    @IsNotEmpty( { message: 'Campo ID UNIDAD ADMINISTRATIVA es requerido.', } )
    @IsString( { message: 'Campo ID UNIDAD ADMINISTRATIVA solo permitido tipo STRING.', } )
    readonly fkidunidadnegocio?: string;

    @IsNotEmpty( { message: 'Campo ID UNIDAD ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo ID UNIDAD ACADEMICA solo permitido tipo STRING.', } )
    readonly fkidunidadacademica?: string;

    @IsNotEmpty( { message: 'Campo ID PROGRAMA es requerido.', } )
    @IsString( { message: 'Campo ID PROGRAMA solo permitido tipo STRING.', } )
    readonly fkidprograma?: string;

    @IsNotEmpty( { message: 'Campo ID PENSUM es requerido.', } )
    @IsString( { message: 'Campo ID PENSUM solo permitido tipo STRING.', } )
    readonly fkidpensum?: string;

    @IsNotEmpty( { message: 'Campo ID DOCENTE es requerido.', } )
    @IsString( { message: 'Campo ID DOCENTE solo permitido tipo STRING.', } )
    readonly fkiddocente?: string;

    @IsNotEmpty( { message: 'Campo ID TURNO es requerido.', } )
    @IsString( { message: 'Campo ID TURNO solo permitido tipo STRING.', } )
    readonly fkidturno?: string;

    @IsNotEmpty( { message: 'Campo ID GESTION PERIODO es requerido.', } )
    @IsString( { message: 'Campo ID GESTION PERIODO solo permitido tipo STRING.', } )
    readonly fkidgestionperiodo?: string;

    @IsNotEmpty( { message: 'Campo ID MATERIA es requerido.', } )
    @IsString( { message: 'Campo ID MATERIA solo permitido tipo STRING.', } )
    readonly fkidmateria?: string;

    @IsNotEmpty( { message: 'Campo ID DIVISION ACADEMICA es requerido.', } )
    @IsString( { message: 'Campo ID DIVISION ACADEMICA solo permitido tipo STRING.', } )
    readonly fkiddivisionacademica?: string;

    @IsNotEmpty( { message: 'Campo CUPO MÁXIMO es requerido.', } )
    @IsInt( { message: 'Campo CUPO MÁXIMO solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo CUPO MÁXIMO es requerido mínimo 0' } )
    @Type( () => Number )
    readonly cupomaximo?: number;

}
