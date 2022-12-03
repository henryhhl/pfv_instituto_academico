import { IsOptional, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateOportunidadTipoMedioPublicitarioDetalleDetalleDto {

    @IsNotEmpty( { message: 'Campo ID Tipo Medio Publicitario es requerido.', } )
    @IsString( { message: 'Campo ID Tipo Medio Publicitario solo permitido tipo STRING.', } )
    readonly fkidtipomediopublicitario: string;

    @IsNotEmpty( { message: 'Campo Tipo Medio Publicitario es requerido.', } )
    @IsString( { message: 'Campo Tipo Medio Publicitario solo permitido tipo STRING.', } )
    readonly tipomediopublicitario: string;

    @IsString( { message: 'Campo Detalle solo permitido tipo STRING.', } )
    @IsOptional()
    readonly detalle?: string;

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
