import { IsOptional } from 'class-validator';

export class CreateCategoriaDocumentoDetalleDto {

    @IsOptional()
    readonly fkidcategoriadocumento?: string;

    @IsOptional()
    readonly categoriadocumento?: string;

    @IsOptional()
    readonly descripcion?: string;

    @IsOptional()
    readonly documento?: string;

    @IsOptional()
    readonly extension?: string;

}
