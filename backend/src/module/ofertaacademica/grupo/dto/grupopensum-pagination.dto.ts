import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationGrupoPensumDto {

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
    @IsBoolean()
    @Type( () => Boolean )
    esPaginate?: boolean;

    @IsOptional()
    @IsString()
    fkidpensum?: string;

    @IsOptional()
    @IsString()
    fkidgrupo?: string;

}
