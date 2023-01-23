import { IsNotEmpty, IsString, MinLength, IsIn, IsOptional } from 'class-validator';

export class CreateCalendarioAcademicoDto {

    @IsNotEmpty( { message: 'Campo fkidunidadadministrativa es requerido.', } )
    @IsString( { message: 'Campo fkidunidadadministrativa solo permitido tipo STRING.', } )
    readonly fkidunidadadministrativa: string;

    @IsNotEmpty( { message: 'Campo fkidgestionperiodo es requerido.', } )
    @IsString( { message: 'Campo fkidgestionperiodo solo permitido tipo STRING.', } )
    readonly fkidgestionperiodo: string;

    @IsNotEmpty( { message: 'Campo tipoactividad es requerido.', } )
    @IsString( { message: 'Campo tipoactividad solo permitido tipo STRING.', } )
    readonly tipoactividad: string;

    @IsNotEmpty( { message: 'Campo tipoferiado es requerido.', } )
    @IsString( { message: 'Campo tipoferiado solo permitido tipo STRING.', } )
    readonly tipoferiado: string;

    @IsNotEmpty( { message: 'Campo existeclases es requerido.', } )
    @IsString( { message: 'Campo existeclases solo permitido tipo STRING.', } )
    readonly existeclases: string;

    @IsNotEmpty( { message: 'Campo nota es requerido.', } )
    @IsString( { message: 'Campo nota solo permitido tipo STRING.', } )
    readonly nota: string;

    @IsNotEmpty( { message: 'Campo fechanota es requerido.', } )
    @IsString( { message: 'Campo fechanota solo permitido tipo STRING.', } )
    readonly fechanota: string;

    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

    @IsOptional()
    readonly x_fecha?: string;

    @IsOptional()
    readonly x_hora?: string;

}
