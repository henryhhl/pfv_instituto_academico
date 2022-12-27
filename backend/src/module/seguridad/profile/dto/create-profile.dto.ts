import { IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {

    @IsOptional()
    @IsString()
    fkidusuario?: string;

    @IsOptional()
    @IsString()
    idprofile?: string;

    @IsOptional()
    @IsString()
    nombreprincipal?: string;

    @IsOptional()
    @IsString()
    nombreadicional?: string;

    @IsOptional()
    @IsString()
    apellidoprimero?: string;

    @IsOptional()
    @IsString()
    apellidosegundo?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    telefonomobile?: string;

    @IsOptional()
    @IsString()
    fechanacimiento ?: string;

    @IsOptional()
    @IsString()
    genero?: string;

    @IsOptional()
    @IsString()
    imagen?: string;

    @IsOptional()
    @IsString()
    fkidciudadorigen?: string;

    @IsOptional()
    @IsString()
    ciudadorigen?: string;

    @IsOptional()
    @IsString()
    direccion?: string;

}
