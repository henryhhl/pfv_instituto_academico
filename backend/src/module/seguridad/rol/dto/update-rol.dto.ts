import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-rol.dto';
import { IsString, MinLength, IsOptional } from 'class-validator';

// export class UpdateRolDto extends PartialType(CreateRolDto) {}

export class UpdateRolDto {

    @IsString( { message: 'Campo ID Tipo Rol es requerido.', } )
    @IsOptional()
    readonly fkidtiporol: string;

    @IsString( { message: 'Campo tipo rol es requerido.', } )
    readonly tiporol: string;

    @IsString( { message: 'Campo descripción es requerido.', } )
    @MinLength(2)
    @IsOptional()
    readonly descripcion: string;

    @IsString( { message: 'Campo nota es requerido.', } )
    @IsOptional()
    readonly nota: string;

    @IsString( { message: 'Campo estado es requerido.', } )
    @IsOptional()
    readonly estado: string;

}
