import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateResponsableDto {

    @IsNotEmpty( { message: 'Campo Código es requerido.', } )
    @IsString( { message: 'Campo Código solo permitido tipo STRING.', } )
    readonly codigo: string;

    @IsNotEmpty( { message: 'Campo Nro Documento es requerido.', } )
    @IsString( { message: 'Campo Nro Documento solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Nro Documento debe ser mayor o igual a 1 carácter.', } )
    readonly nrodocumento: string;

    @IsNotEmpty( { message: 'Campo Nombre es requerido.', } )
    @IsString( { message: 'Campo Nombre solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Nombre debe ser mayor o igual a 1 carácter.', } )
    readonly nombre: string;

    @IsNotEmpty( { message: 'Campo Apellido es requerido.', } )
    @IsString( { message: 'Campo Apellido solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Apellido debe ser mayor o igual a 1 carácter.', } )
    readonly apellido: string;

    @IsNotEmpty( { message: 'Campo Ciudad es requerido.', } )
    @IsString( { message: 'Campo Ciudad solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Ciudad debe ser mayor o igual a 1 carácter.', } )
    readonly ciudad: string;

    @IsNotEmpty( { message: 'Campo Dirección es requerido.', } )
    @IsString( { message: 'Campo Dirección solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Dirección debe ser mayor o igual a 1 carácter.', } )
    readonly direccion: string;

    @IsNotEmpty( { message: 'Campo Genero es requerido.', } )
    @IsString( { message: 'Campo Genero solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Genero debe ser mayor o igual a 1 carácter.', } )
    readonly genero: string;

    @IsOptional()
    @IsString( { message: 'Campo Fecha Nacimiento solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo Fecha Nacimiento debe ser mayor o igual a 1 carácter.', } )
    readonly fechanacimiento?: string;

}
