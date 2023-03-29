import { ValidateNested, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { NotaCursoFirstDto } from './nota-curso-first.dto';

export class CreateNotaCursoDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => NotaCursoFirstDto )
    @IsOptional()
    readonly arrayNotaCurso?: NotaCursoFirstDto[];
}
