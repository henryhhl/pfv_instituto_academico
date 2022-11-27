import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateCierreCursoDto {

    @IsString( { message: 'Campo OBSERVACIONES solo permitido tipo STRING.', } )
    @IsOptional()
    readonly observaciones: string;

    @IsNotEmpty( { message: 'Campo FECHA OPERACIÓN es requerido.', } )
    @IsString( { message: 'Campo FECHA OPERACIÓN solo permitido tipo STRING.', } )
    readonly fechaoperacion: string;

}
