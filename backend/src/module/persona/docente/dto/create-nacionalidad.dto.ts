import { IsOptional } from 'class-validator';

export class CreateNacionalidadDto {

    @IsOptional()
    readonly fkidnacionalidad?: string;

    @IsOptional()
    readonly nacionalidad?: string;

}
