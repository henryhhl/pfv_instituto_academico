
import { IsOptional, IsString } from 'class-validator';

export class FindEstudianteForMateriaDto {

    @IsOptional()
    @IsString()
    fkidunidadadministrativa?: string;

    @IsOptional()
    @IsString()
    fkidunidadacademica?: string;

    @IsOptional()
    @IsString()
    fkidunidadnegocio?: string;

    @IsOptional()
    @IsString()
    fkidgestionperiodo?: string;

    @IsOptional()
    @IsString()
    fkidprograma?: string;

    @IsOptional()
    @IsString()
    fkidpensum?: string;

    @IsOptional()
    @IsString()
    fkidmateria?: string;

    @IsOptional()
    @IsString()
    fkidgrupo?: string;

    @IsOptional()
    @IsString()
    fkiddocente?: string;

}
