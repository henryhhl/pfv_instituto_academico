import { PartialType } from '@nestjs/mapped-types';
import { CreateCiudadDto } from './create-ciudad.dto';
import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

// export class UpdateCiudadDto extends PartialType(CreateCiudadDto) {}
    export class UpdateCiudadDto {

    @IsNotEmpty( { message: 'Campo ID CIUDAD es requerido.', } )
    @IsString( { message: 'Campo ID CIUDAD solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidciudadpadre?: string;

    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo sigla debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly descripcion: string;

    @IsNotEmpty( { message: 'Campo imagen es requerido.', } )
    @IsString( { message: 'Campo imagen solo permitido tipo STRING.', } )
    @IsOptional()
    readonly imagen?: string;

    @IsNotEmpty( { message: 'Campo estado es requerido.', } )
    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @IsOptional()
    readonly estado?: string;

}
