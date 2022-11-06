import { IsOptional } from 'class-validator';

export class CreateMateriaDetalleDto {

    @IsOptional()
    readonly fkidmateria?: string;

    @IsOptional()
    readonly materia?: string;

    @IsOptional()
    readonly tipoprioridad?: string;

    @IsOptional()
    readonly estado?: string;

}
