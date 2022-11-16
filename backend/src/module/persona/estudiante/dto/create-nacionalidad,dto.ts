import { IsOptional } from 'class-validator';

export class CreateEstudianteNacionalidadDto {

    @IsOptional()
    readonly fkidnacionalidad?: string;

    @IsOptional()
    readonly nacionalidad?: string;

}
