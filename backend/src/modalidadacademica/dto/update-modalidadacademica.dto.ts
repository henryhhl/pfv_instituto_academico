import { PartialType } from '@nestjs/mapped-types';
import { CreateModalidadAcademicaDto } from './create-modalidadacademica.dto';
import { IsString, IsUUID, IsOptional, MinLength } from 'class-validator';

// export class UpdateModalidadacademicaDto extends PartialType(CreateModalidadAcademicaDto) {}
export class UpdateModalidadAcademicaDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly idmodalidadacademica?: string;

    @IsString( { message: 'Campo sigla es requerido.', } )
    @MinLength(1, { message: 'Campo sigla debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly sigla?: string;

    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(1, { message: 'Campo descripción debe ser mayor o igual a 1 carácter.', } )
    @IsOptional()
    readonly descripcion?: string;

    @IsString( { message: 'Campo estado es requerido.', } )
    @IsOptional()
    readonly estado?: string;

}
