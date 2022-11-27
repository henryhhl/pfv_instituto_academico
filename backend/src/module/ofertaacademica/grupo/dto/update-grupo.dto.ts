import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoDto } from './create-grupo.dto';
import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateGrupoDto extends PartialType(CreateGrupoDto) {

    @IsString( { message: 'Campo estado solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
