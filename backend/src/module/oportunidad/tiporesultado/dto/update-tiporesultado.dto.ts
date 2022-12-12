import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsIn, IsOptional } from 'class-validator';
import { CreateTipoResultadoDto } from './create-tiporesultado.dto';

export class UpdateTipoResultadoDto extends PartialType(CreateTipoResultadoDto) {

    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
