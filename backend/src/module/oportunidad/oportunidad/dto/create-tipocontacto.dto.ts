import { IsOptional, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateOportunidadTipoContactoDetalleDetalleDto {

    @IsNotEmpty( { message: 'Campo ID Tipo Contacto es requerido.', } )
    @IsString( { message: 'Campo ID Tipo Contacto solo permitido tipo STRING.', } )
    readonly fkidtipocontacto: string;

    @IsNotEmpty( { message: 'Campo Tipo Contacto es requerido.', } )
    @IsString( { message: 'Campo Tipo Contacto solo permitido tipo STRING.', } )
    readonly tipocontacto: string;

    @IsString( { message: 'Campo Detalle solo permitido tipo STRING.', } )
    @IsOptional()
    readonly detalle?: string;

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
