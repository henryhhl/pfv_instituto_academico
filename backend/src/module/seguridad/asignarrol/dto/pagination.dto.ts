import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class AsignarRolPaginationDto {

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
    fkidusuario?: string;

    @IsOptional()
    @IsString()
    fkidrol?: string;

}
