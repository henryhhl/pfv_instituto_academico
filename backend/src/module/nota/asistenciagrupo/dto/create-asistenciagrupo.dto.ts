import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsOptional } from 'class-validator';
import { AsistenciaGrupoFirstDto } from './asistencia_grupo_first.dto';

export class CreateAsistenciaGrupoDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => AsistenciaGrupoFirstDto )
    @IsOptional()
    readonly arrayAsistencia?: AsistenciaGrupoFirstDto[];

}
