
import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoMateriaDto } from './create-tipomateria.dto';
import { IsString, IsOptional, MinLength } from 'class-validator';

// export class UpdateTipomateriaDto extends PartialType(CreateTipoMateriaDto) {}

export class UpdateTipoMateriaDto {

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(1)
    @IsOptional()
    readonly sigla: string;

    @IsString( { message: 'La descripción es requerido.', } )
    @MinLength(2)
    @IsOptional()
    readonly descripcion: string;
}
