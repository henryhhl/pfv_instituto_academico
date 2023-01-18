import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { CreateGrupoMateriaDetalleDto } from './create-grupomateria.dto';

export class CreateGrupoDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateGrupoMateriaDetalleDto )
    @IsOptional()
    readonly arraygrupomateriadetalle?: CreateGrupoMateriaDetalleDto[];
    
    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla solo permitido tipo STRING.', } )
    readonly sigla: string;

}
