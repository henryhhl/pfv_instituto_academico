import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { CreateGrupoMateriaDiaHorarioDto } from './create-grupomateriadiahorario.dto';

export class CreateDiaDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateGrupoMateriaDiaHorarioDto )
    @IsOptional()
    readonly arrayhorario?: CreateGrupoMateriaDiaHorarioDto[];

    @IsNotEmpty( { message: 'Campo iddia es requerido.', } )
    @IsString( { message: 'Campo iddia solo permitido tipo STRING.', } )
    readonly iddia: string;
    
    @IsNotEmpty( { message: 'Campo sigla es requerido.', } )
    @IsString( { message: 'Campo sigla solo permitido tipo STRING.', } )
    readonly sigla: string;

    @IsNotEmpty( { message: 'Campo descripcion es requerido.', } )
    @IsString( { message: 'Campo descripcion solo permitido tipo STRING.', } )
    readonly descripcion: string;

}
