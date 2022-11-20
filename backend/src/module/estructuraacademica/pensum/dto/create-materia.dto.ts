import { Type } from 'class-transformer';
import { IsOptional, IsIn, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Materia } from '../../../parametro/materia/entities/materia.entity';
import { TipoMateria } from '../../../parametro/tipomateria/entities/tipomateria.entity';

export class CreatePensumDivisionAcademicaMateriaDetalleDto {

    @IsNotEmpty( { message: 'Campo ID Materia es requerido.', } )
    readonly materia: Materia;

    @IsNotEmpty( { message: 'Campo ID Tipo Materia es requerido.', } )
    readonly tipomateria: TipoMateria;

    @IsOptional()
    @Type( () => Number )
    readonly secuencia?: number;

    @IsOptional()
    @IsInt( { message: 'Campo Nota Minima solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo Nota Minima es requerido mínimo 0' } )
    @Type( () => Number )
    readonly notaminima?: number;

    @IsOptional()
    @IsInt( { message: 'Campo Nota Maxima solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo Nota Maxima es requerido mínimo 0' } )
    @Type( () => Number )
    readonly notamaxima?: number;

    @IsOptional()
    @IsInt( { message: 'Campo Hora Teorica solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo Hora Teorica es requerido mínimo 0' } )
    @Type( () => Number )
    readonly horateorica?: number;

    @IsOptional()
    @IsInt( { message: 'Campo Hora Practica solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo Hora Practica es requerido mínimo 0' } )
    @Type( () => Number )
    readonly horapractica?: number;

    @IsOptional()
    @IsInt( { message: 'Campo Hora Sociales solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo Hora Sociales es requerido mínimo 0' } )
    @Type( () => Number )
    readonly horasociales?: number;

    @IsOptional()
    @IsInt( { message: 'Campo Cupo solo permitido tipo entero positivo.', } )
    @Min(0, { message: 'Campo Cupo es requerido mínimo 0' } )
    @Type( () => Number )
    readonly cuporequerido?: number;

    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
