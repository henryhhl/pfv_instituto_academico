import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateAperturaCierreCursoDto {

    @IsNotEmpty( { message: 'Campo ID MOTIVO APERTURA CIERRE CURSO es requerido.', } )
    @IsString( { message: 'Campo ID MOTIVO APERTURA CIERRE CURSO solo permitido tipo STRING.', } )
    readonly fkidmotivoaperturacierrecurso: string;

    @IsNotEmpty( { message: 'Campo MOTIVO APERTURA CIERRE CURSO es requerido.', } )
    @IsString( { message: 'Campo MOTIVO APERTURA CIERRE CURSO solo permitido tipo STRING.', } )
    readonly motivoaperturacierrecurso: string;

    @IsNotEmpty( { message: 'Campo ID ADMINISTRATIVO es requerido.', } )
    @IsString( { message: 'Campo ID ADMINISTRATIVO solo permitido tipo STRING.', } )
    readonly fkidadministrativo: string;

    @IsNotEmpty( { message: 'Campo ADMINISTRATIVO es requerido.', } )
    @IsString( { message: 'Campo ADMINISTRATIVO solo permitido tipo STRING.', } )
    readonly administrativo: string;

    @IsString( { message: 'Campo OBSERVACIONES solo permitido tipo STRING.', } )
    @IsOptional()
    readonly observaciones: string;

    @IsNotEmpty( { message: 'Campo FECHA OPERACIÓN es requerido.', } )
    @IsString( { message: 'Campo FECHA OPERACIÓN solo permitido tipo STRING.', } )
    readonly fechaoperacion: string;

    @IsNotEmpty( { message: 'Campo ESTADO PROCESO es requerido.', } )
    @IsString( { message: 'Campo ESTADO PROCESO solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'C', 'N', ], { message: 'Campo ESTADO PROCESO permite valor: A, C y N', } )
    readonly estadoproceso?: string;

}
