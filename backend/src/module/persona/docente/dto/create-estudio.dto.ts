import { IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDocenteEstudioDetalleDto {

    @IsOptional()
    readonly fkidinstitucion?: string;

    @IsOptional()
    readonly institucion?: string;

    @IsOptional()
    readonly fkidnivelacademico?: string;

    @IsOptional()
    readonly nivelacademico?: string;

    @IsOptional()
    readonly descripcion?: string;

    @IsIn( [ 'S', 'N', ], { message: 'Campo Es Graduado permite valor: S y N', } )
    @IsOptional()
    readonly esgraduado?: string;

    @IsOptional()
    @Type( () => Number )
    readonly ultimoyearcursado?: number;

    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
