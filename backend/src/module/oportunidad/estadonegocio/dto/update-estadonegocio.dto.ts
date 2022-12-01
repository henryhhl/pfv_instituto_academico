import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoNegocioDto } from './create-estadonegocio.dto';
import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateEstadoNegocioDto extends PartialType(CreateEstadoNegocioDto) {

    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
