import { Type } from 'class-transformer';
import { IsOptional, IsIn, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { CreateProgramaDivisionAcademicaMateriaDetalleDto } from './create-materia.dto';

export class CreateProgramaDivisionAcademicaDetalleDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateProgramaDivisionAcademicaMateriaDetalleDto )
    @IsOptional()
    readonly arraymateria?: CreateProgramaDivisionAcademicaMateriaDetalleDto[];

    @IsOptional()
    readonly idprogramadivisionacademicadetalle?: string;

    @IsNotEmpty( { message: 'Campo ID Division Academica es requerido.', } )
    readonly fkiddivisionacademica?: string;

    @IsNotEmpty( { message: 'Campo Division Academica es requerido.', } )
    readonly divisionacademica?: string;

    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
