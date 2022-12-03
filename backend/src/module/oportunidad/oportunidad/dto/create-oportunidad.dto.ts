import { IsNotEmpty, IsString, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOportunidadTipoContactoDetalleDetalleDto } from './create-tipocontacto.dto';
import { CreateOportunidadTipoMedioPublicitarioDetalleDetalleDto } from './create-tipomediopublicitario.dto';

export class CreateOportunidadDto {

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateOportunidadTipoContactoDetalleDetalleDto )
    @IsOptional()
    readonly arraytipocontacto?: CreateOportunidadTipoContactoDetalleDetalleDto[];

    @ValidateNested( { each: true, } )
    @IsArray()
    @Type(() => CreateOportunidadTipoMedioPublicitarioDetalleDetalleDto )
    @IsOptional()
    readonly arraytipomediopublicitario?: CreateOportunidadTipoMedioPublicitarioDetalleDetalleDto[];


    @IsNotEmpty( { message: 'Campo ID Ciudad Origen es requerido.', } )
    @IsString( { message: 'Campo ID Ciudad Origen solo permitido tipo STRING.', } )
    readonly fkidciudadorigen: string;

    @IsNotEmpty( { message: 'Campo Ciudad Origen es requerido.', } )
    @IsString( { message: 'Campo Ciudad Origen solo permitido tipo STRING.', } )
    readonly ciudadorigen: string;


    @IsNotEmpty( { message: 'Campo ID Asesor Responsable es requerido.', } )
    @IsString( { message: 'Campo ID Asesor Responsable solo permitido tipo STRING.', } )
    readonly fkidasesorresponsable: string;

    @IsNotEmpty( { message: 'Campo Asesor Responsable es requerido.', } )
    @IsString( { message: 'Campo Asesor Responsable solo permitido tipo STRING.', } )
    readonly asesorresponsable: string;


    @IsNotEmpty( { message: 'Campo Identificacion es requerido.', } )
    @IsString( { message: 'Campo Identificacion solo permitido tipo STRING.', } )
    readonly identificacion: string;

    @IsNotEmpty( { message: 'Campo Descripción es requerido.', } )
    @IsString( { message: 'Campo Descripción solo permitido tipo STRING.', } )
    readonly descripcion: string;

    @IsNotEmpty( { message: 'Campo Celular es requerido.', } )
    @IsString( { message: 'Campo Celular solo permitido tipo STRING.', } )
    readonly celular: string;

    @IsNotEmpty( { message: 'Campo Email es requerido.', } )
    @IsString( { message: 'Campo Email solo permitido tipo STRING.', } )
    readonly email: string;

    @IsNotEmpty( { message: 'Campo Dirección es requerido.', } )
    @IsString( { message: 'Campo Dirección solo permitido tipo STRING.', } )
    readonly direccion: string;

    @IsNotEmpty( { message: 'Campo Barrio es requerido.', } )
    @IsString( { message: 'Campo Barrio solo permitido tipo STRING.', } )
    readonly barrio: string;

    @IsNotEmpty( { message: 'Campo Fecha Registro es requerido.', } )
    @IsString( { message: 'Campo Fecha Registro solo permitido tipo STRING.', } )
    readonly fecharegistro: string;

    @IsNotEmpty( { message: 'Campo Hora Registro es requerido.', } )
    @IsString( { message: 'Campo Hora Registro solo permitido tipo STRING.', } )
    readonly horaregistro: string;

    @IsString( { message: 'Campo Nota solo permitido tipo STRING.', } )
    @IsOptional()
    readonly nota?: string;

}
