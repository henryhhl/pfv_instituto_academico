import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodoDto } from './create-periodo.dto';
import { IsString, IsUUID, IsOptional, MinLength } from 'class-validator';

// export class UpdatePeriodoDto extends PartialType(CreatePeriodoDto) {}
export class UpdatePeriodoDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly idperiodo?: string;

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
