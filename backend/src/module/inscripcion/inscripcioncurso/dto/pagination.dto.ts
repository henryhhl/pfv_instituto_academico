import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class InscripcionCursoPaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    limit?: number;

    @IsOptional()
    @Type( () => Number )
    offset?: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    fkidcurso?: string;

    @IsOptional()
    @IsBoolean()
    @Type( () => Boolean )
    esPaginate?: boolean;

}
