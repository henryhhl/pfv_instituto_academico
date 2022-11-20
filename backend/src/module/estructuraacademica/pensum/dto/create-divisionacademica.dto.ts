import { Type } from 'class-transformer';
import { IsOptional, IsIn, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { CreatePensumDivisionAcademicaMateriaDetalleDto } from './create-materia.dto';
import { DivisionAcademica } from '../../../estructurainstitucional/divisionacademica/entities/divisionacademica.entity';

export class CreatePensumDivisionAcademicaDetalleDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreatePensumDivisionAcademicaMateriaDetalleDto )
    @IsOptional()
    readonly arraymateria?: CreatePensumDivisionAcademicaMateriaDetalleDto[];

    @IsNotEmpty( { message: 'Campo Division Academica es requerido.', } )
    readonly divisionacademica?: DivisionAcademica;

    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
