import { PartialType } from '@nestjs/mapped-types';
import { CreateOportunidadDto } from './create-oportunidad.dto';
import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateOportunidadDto extends PartialType(CreateOportunidadDto) {

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
