import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateInscripcionProgramaDto {

    @IsNotEmpty( { message: 'Campo fkidunidadadministrativa es requerido.', } )
    @IsString( { message: 'Campo fkidunidadadministrativa permitido tipo String.', } )
    readonly fkidunidadadministrativa: string;

    @IsNotEmpty( { message: 'Campo fkidunidadacademica es requerido.', } )
    @IsString( { message: 'Campo fkidunidadacademica permitido tipo String.', } )
    readonly fkidunidadacademica: string;

    @IsNotEmpty( { message: 'Campo fkidunidadnegocio es requerido.', } )
    @IsString( { message: 'Campo fkidunidadnegocio permitido tipo String.', } )
    readonly fkidunidadnegocio: string;

    @IsNotEmpty( { message: 'Campo fkidprograma es requerido.', } )
    @IsString( { message: 'Campo fkidprograma permitido tipo String.', } )
    readonly fkidprograma: string;

    @IsNotEmpty( { message: 'Campo fkidpensum es requerido.', } )
    @IsString( { message: 'Campo fkidpensum permitido tipo String.', } )
    readonly fkidpensum: string;

    @IsNotEmpty( { message: 'Campo fkidestudiante es requerido.', } )
    @IsString( { message: 'Campo fkidestudiante permitido tipo String.', } )
    readonly fkidestudiante: string;

    @IsNotEmpty( { message: 'Campo fkidgestionperiodo es requerido.', } )
    @IsString( { message: 'Campo fkidgestionperiodo permitido tipo String.', } )
    readonly fkidgestionperiodo: string;

    @IsNotEmpty( { message: 'Campo esinscripcionformalizada es requerido.', } )
    @IsString( { message: 'Campo esinscripcionformalizada permitido tipo String.', } )
    @IsIn( [ 'S', 'N', ], { message: 'Campo esinscripcionformalizada permite valor: S y N', } )
    readonly esinscripcionformalizada: string;

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
