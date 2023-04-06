import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, MinLength, IsIn, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { CreateCursoDto } from './create-curso.dto';
import { CreateCursoParametroCalificacionDto } from './create-parametrocalificacion.dto';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateCursoParametroCalificacionDto )
    @IsOptional()
    readonly arrayparametrocalificaciondelete?: CreateCursoParametroCalificacionDto[];

}
