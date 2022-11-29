import { IsNotEmpty, IsString, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateGrupoPensumMateriaDetalleDto } from './create-pensummateria.dto';

export class CreateGrupoDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateGrupoPensumMateriaDetalleDto )
    @IsOptional()
    readonly arraygrupopensummateria?: CreateGrupoPensumMateriaDetalleDto[];
    
    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla solo permitido tipo STRING.', } )
    readonly sigla: string;

}
