import { IsNotEmpty, IsString, IsOptional, MinLength, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTurnoDetalleDto } from './create-turno.dto';
import { CreateAulaDetalleDto } from './create-aula.dto';

export class CreateUnidadAdministrativaDto {
    
    @IsNotEmpty( { message: 'Campo ID Unidad Negocio es requerido.', } )
    @IsString( { message: 'Campo ID Unidad Negocio solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidunidadnegocio: string;

    @IsNotEmpty( { message: 'Campo Unidad Negocio es requerido.', } )
    @IsString( { message: 'Campo Unidad Negocio solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Unidad Negocio debe ser mayor o igual a 1 carácter.', } )
    readonly unidadnegocio: string;

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateTurnoDetalleDto )
    @IsOptional()
    readonly arrayturno?: CreateTurnoDetalleDto[];

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateAulaDetalleDto )
    @IsOptional()
    readonly arrayaula?: CreateAulaDetalleDto[];

    @IsNotEmpty( { message: 'Campo Sigla es requerido.', } )
    @IsString( { message: 'Campo Sigla solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Sigla debe ser mayor o igual a 1 carácter.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

}
