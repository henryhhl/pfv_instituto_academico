import { IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAulaDetalleDto {

    @IsOptional()
    readonly fkidaula?: string;

    @IsOptional()
    readonly aula?: string;

    @IsOptional()
    @Type( () => Number )
    readonly cupo?: number;

    @IsOptional()
    readonly nota?: string;

    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
