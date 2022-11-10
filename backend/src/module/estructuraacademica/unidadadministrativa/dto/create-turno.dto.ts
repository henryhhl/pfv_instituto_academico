import { IsOptional, IsIn } from 'class-validator';

export class CreateTurnoDetalleDto {

    @IsOptional()
    readonly fkidturno?: string;

    @IsOptional()
    readonly turno?: string;

    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
