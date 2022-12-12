import { PartialType } from '@nestjs/mapped-types';
import { StoreActividadDto } from './store-actividad.dto';
import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateActividadDto extends PartialType(StoreActividadDto) {

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
