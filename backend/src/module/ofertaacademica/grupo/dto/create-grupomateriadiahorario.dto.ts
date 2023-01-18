import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGrupoMateriaDiaHorarioDto {

    @IsNotEmpty( { message: 'Campo horainicio es requerido.', } )
    @IsString( { message: 'Campo horainicio solo permitido tipo STRING.', } )
    readonly horainicio: string;

    @IsNotEmpty( { message: 'Campo horafinal es requerido.', } )
    @IsString( { message: 'Campo horafinal solo permitido tipo STRING.', } )
    readonly horafinal: string;

    @IsNotEmpty( { message: 'Campo fkidaula es requerido.', } )
    @IsString( { message: 'Campo fkidaula solo permitido tipo STRING.', } )
    readonly fkidaula: string;

    @IsString( { message: 'Campo aula solo permitido tipo STRING.', } )
    @IsOptional()
    readonly aula: string;

    @IsString( { message: 'Campo fkiddia solo permitido tipo STRING.', } )
    @IsOptional()
    readonly fkiddia: string;

    @IsString( { message: 'Campo dia solo permitido tipo STRING.', } )
    @IsOptional()
    readonly dia: string;

}
