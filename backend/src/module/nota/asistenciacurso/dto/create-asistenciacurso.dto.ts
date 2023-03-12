import { ValidateNested, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AsistenciaCursoFirstDto } from './asistencia-curso-first.dto';

export class CreateAsistenciaCursoDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => AsistenciaCursoFirstDto )
    @IsOptional()
    readonly arrayAsistencia?: AsistenciaCursoFirstDto[];
    
}
