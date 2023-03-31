import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsOptional } from 'class-validator';
import { NotaGrupoFirstDto } from './nota-grupo-first.dto';

export class CreateNotaGrupoDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => NotaGrupoFirstDto )
    @IsOptional()
    readonly arrayNotaGrupo?: NotaGrupoFirstDto[];

}
