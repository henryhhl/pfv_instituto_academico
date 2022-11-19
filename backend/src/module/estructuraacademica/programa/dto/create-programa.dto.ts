import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, MinLength, ValidateNested, IsArray } from 'class-validator';
import { CreateProgramaDivisionAcademicaDetalleDto } from './create-divisionacademica.dto';

export class CreateProgramaDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateProgramaDivisionAcademicaDetalleDto )
    @IsOptional()
    readonly arraydivisionacademica?: CreateProgramaDivisionAcademicaDetalleDto[];

    @IsNotEmpty( { message: 'Campo ID Unidad Negocio es requerido.', } )
    @IsString( { message: 'Campo ID Unidad Negocio solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidunidadnegocio: string;

    @IsNotEmpty( { message: 'Campo Unidad Negocio es requerido.', } )
    @IsString( { message: 'Campo Unidad Negocio solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Unidad Negocio debe ser mayor o igual a 1 carácter.', } )
    readonly unidadnegocio: string;

    @IsNotEmpty( { message: 'Campo ID Unidad Administrativa es requerido.', } )
    @IsString( { message: 'Campo ID Unidad Administrativa solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidunidadadministrativa: string;

    @IsNotEmpty( { message: 'Campo Unidad Administrativa es requerido.', } )
    @IsString( { message: 'Campo Unidad Administrativa solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Unidad Administrativa debe ser mayor o igual a 1 carácter.', } )
    readonly unidadadministrativa: string;

    @IsNotEmpty( { message: 'Campo ID Unidad Academica es requerido.', } )
    @IsString( { message: 'Campo ID Unidad Academica solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidunidadacademica: string;

    @IsNotEmpty( { message: 'Campo Unidad Academica es requerido.', } )
    @IsString( { message: 'Campo Unidad Academica solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Unidad Academica debe ser mayor o igual a 1 carácter.', } )
    readonly unidadacademica: string;

    @IsNotEmpty( { message: 'Campo ID Nivel Academico es requerido.', } )
    @IsString( { message: 'Campo ID Nivel Academico solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidnivelacademico: string;

    @IsNotEmpty( { message: 'Campo Nivel Academico es requerido.', } )
    @IsString( { message: 'Campo Nivel Academico solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Nivel Academico debe ser mayor o igual a 1 carácter.', } )
    readonly nivelacademico: string;

    @IsNotEmpty( { message: 'Campo ID Modalidad Academica es requerido.', } )
    @IsString( { message: 'Campo ID Modalidad Academica solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkidmodalidadacademica: string;

    @IsNotEmpty( { message: 'Campo Modalidad Academica es requerido.', } )
    @IsString( { message: 'Campo Modalidad Academica solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Modalidad Academica debe ser mayor o igual a 1 carácter.', } )
    readonly modalidadacademica: string;

    @IsNotEmpty( { message: 'Campo Código es requerido.', } )
    @IsString( { message: 'Campo Código solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Código debe ser mayor o igual a 1 carácter.', } )
    readonly codigo: string;

    @IsNotEmpty( { message: 'Campo Sigla es requerido.', } )
    @IsString( { message: 'Campo Sigla solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Sigla debe ser mayor o igual a 1 carácter.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripción es requerido.', } )
    @IsString( { message: 'Campo descripción solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    readonly descripcion: string;

}
