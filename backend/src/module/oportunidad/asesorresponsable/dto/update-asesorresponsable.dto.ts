import { PartialType } from '@nestjs/mapped-types';
import { CreateAsesorResponsableDto } from './create-asesorresponsable.dto';
import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateAsesorResponsableDto extends PartialType(CreateAsesorResponsableDto) {

    @IsString( { message: 'Campo Estado solo permitido tipo STRING.', } )
    @IsIn( [ 'A', 'N', ], { message: 'Campo Estado permite valor: A y N', } )
    @IsOptional()
    readonly estado?: string;

}
