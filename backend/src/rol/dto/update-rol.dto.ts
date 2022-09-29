import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-rol.dto';
import { IsString, MinLength, IsOptional } from 'class-validator';

// export class UpdateRolDto extends PartialType(CreateRolDto) {}

export class UpdateRolDto {

    @IsString( { message: 'La descripción es requerido.', } )
    @IsOptional()
    readonly fkidtiporol: string;

    @IsString( { message: 'La descripción es requerido.', } )
    readonly tiporol: string;

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(2)
    @IsOptional()
    readonly descripcion: string;

    @IsString( { message: 'La descripción es requerido.', } )
    @IsOptional()
    readonly nota: string;

}
