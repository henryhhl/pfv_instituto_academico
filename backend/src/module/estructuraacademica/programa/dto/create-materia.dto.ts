import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class CreateProgramaDivisionAcademicaMateriaDetalleDto {

    @IsNotEmpty( { message: 'Campo ID Materia es requerido.', } )
    readonly fkidmateria: string;

    @IsNotEmpty( { message: 'Campo Materia es requerido.', } )
    readonly materia: string;

    @IsNotEmpty( { message: 'Campo Materia es requerido.', } )
    readonly codmateria: string;

    @IsNotEmpty( { message: 'Campo Materia es requerido.', } )
    readonly siglamateria: string;

    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
