import { PartialType } from '@nestjs/mapped-types';
import { CreateMotivoAperturaCierreCursoDto } from './create-motivoaperturacierrecurso.dto';
import { IsString, MinLength, IsIn, IsOptional } from 'class-validator';

export class UpdateMotivoAperturaCierreCursoDto extends PartialType(CreateMotivoAperturaCierreCursoDto) {

    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @MinLength(1, { message: 'Campo estado debe ser mayor o igual a 1 carácter.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
