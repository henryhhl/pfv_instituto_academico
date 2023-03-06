import { IsNotEmpty, IsString, IsOptional, IsIn, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInscripcionGrupoDto {

    @IsNotEmpty( { message: 'Campo fkidunidadadministrativa es requerido.', } )
    @IsString( { message: 'Campo fkidunidadadministrativa permitido tipo String.', } )
    readonly fkidunidadadministrativa: string;

    @IsNotEmpty( { message: 'Campo fkidunidadacademica es requerido.', } )
    @IsString( { message: 'Campo fkidunidadacademica permitido tipo String.', } )
    readonly fkidunidadacademica: string;

    @IsNotEmpty( { message: 'Campo fkidunidadnegocio es requerido.', } )
    @IsString( { message: 'Campo fkidunidadnegocio permitido tipo String.', } )
    readonly fkidunidadnegocio: string;

    @IsNotEmpty( { message: 'Campo fkidestudiante es requerido.', } )
    @IsString( { message: 'Campo fkidestudiante permitido tipo String.', } )
    readonly fkidestudiante: string;

    @IsNotEmpty( { message: 'Campo fkidgestionperiodo es requerido.', } )
    @IsString( { message: 'Campo fkidgestionperiodo permitido tipo String.', } )
    readonly fkidgestionperiodo: string;

    @IsNotEmpty( { message: 'Campo fkidprograma es requerido.', } )
    @IsString( { message: 'Campo fkidprograma permitido tipo String.', } )
    readonly fkidprograma: string;

    @IsNotEmpty( { message: 'Campo fkidpensum es requerido.', } )
    @IsString( { message: 'Campo fkidpensum permitido tipo String.', } )
    readonly fkidpensum: string;

    @IsNotEmpty( { message: 'Campo fkidmateria es requerido.', } )
    @IsString( { message: 'Campo fkidmateria permitido tipo String.', } )
    readonly fkidmateria: string;

    @IsNotEmpty( { message: 'Campo fkidgrupo es requerido.', } )
    @IsString( { message: 'Campo fkidgrupo permitido tipo String.', } )
    readonly fkidgrupo: string;

    @IsNotEmpty( { message: 'Campo fkiddocente es requerido.', } )
    @IsString( { message: 'Campo fkiddocente permitido tipo String.', } )
    readonly fkiddocente: string;

    @IsNotEmpty( { message: 'Campo fkidgrupopensumdetalle es requerido.', } )
    @IsInt( { message: 'Campo fkidgrupopensumdetalle solo permitido tipo entero positivo.', } )
    @Type( () => Number )
    readonly fkidgrupopensumdetalle: number;

    @IsNotEmpty( { message: 'Campo fechainscripcion es requerido.', } )
    @IsString( { message: 'Campo fechainscripcion permitido tipo String.', } )
    readonly fechainscripcion: string;

    @IsString( { message: 'Campo nota permitido tipo String.', } )
    @IsOptional()
    readonly nota: string;

    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
