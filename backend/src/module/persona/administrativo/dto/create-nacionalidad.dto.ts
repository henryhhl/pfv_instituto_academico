import { IsOptional } from 'class-validator';

export class CreateAdministrativoNacionalidadDto {

    @IsOptional()
    readonly fkidnacionalidad?: string;

    @IsOptional()
    readonly nacionalidad?: string;

}
