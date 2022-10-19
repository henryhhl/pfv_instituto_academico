import { PartialType } from '@nestjs/mapped-types';
import { CreateMateriaDto } from './create-materia.dto';
import { IsString, IsUUID, IsOptional, MinLength } from 'class-validator';

// export class UpdateMateriaDto extends PartialType(CreateMateriaDto) {}
export class UpdateMateriaDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly idmateria?: string;

    @IsString( { message: 'Campo ID Tipo Materia es requerido.', } )
    @MinLength(1, { message: 'Campo ID Tipo Materia debe ser mayor o igual a 1 carácter.', })
    @IsOptional()
    readonly fkidtipomateria: string;

    @IsString( { message: 'Campo Tipo Materia es requerido.', } )
    @MinLength(1, { message: 'Campo Tipo Materia debe ser mayor o igual a 1 carácter.', })
    @IsOptional()
    readonly tipomateria: string;

    @IsString( { message: 'Campo código es requerido.', } )
    @MinLength(1, { message: 'Campo código debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly codigo?: string;

    @IsString( { message: 'Campo sigla es requerido.', } )
    @MinLength(1, { message: 'Campo sigla debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly sigla?: string;

    @IsString( { message: 'Campo nombre largo es requerido.', } )
    @MinLength(1, { message: 'Campo nombre largo debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly nombrelargo?: string;

    @IsString( { message: 'Campo nombre largo es requerido.', } )
    @MinLength(1, { message: 'Campo nombre largo debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly nombrecorto?: string;

    @IsString( { message: 'Campo nombre alternativo es requerido.', } )
    @MinLength(1, { message: 'Campo nombre alternativo debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly nombrealternativo?: string;

    @IsString( { message: 'Campo créditos es requerido.', } )
    @MinLength(1, { message: 'Campo créditos debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly creditos?: string;

    @IsString( { message: 'Campo estado es requerido.', } )
    @IsOptional()
    readonly estado?: string;

}
