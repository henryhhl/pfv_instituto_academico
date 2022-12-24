import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class InscripcionGrupoPaginationDto {

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
    fkidpensum?: string;

    @IsOptional()
    @IsString()
    fkidgrupo?: string;

    @IsOptional()
    @IsString()
    fkidmateria?: string;

    @IsOptional()
    @IsString()
    fkidgestionperiodo?: string;

    @IsOptional()
    @IsBoolean()
    @Type( () => Boolean )
    esPaginate?: boolean;

}
