
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator';

export class CreateCursoParametroCalificacionDto {

    @IsOptional()
    readonly idcursoparametrocalificacion?: string;

    @IsNotEmpty( { message: 'Campo fkidparametrocalificacion es requerido.', } )
    @IsString( { message: 'Campo fkidparametrocalificacion solo permitido tipo STRING.', } )
    readonly fkidparametrocalificacion: string;

    @IsNotEmpty( { message: 'Campo parametrocalificacion es requerido.', } )
    @IsString( { message: 'Campo parametrocalificacion solo permitido tipo STRING.', } )
    readonly parametrocalificacion: string;
    
    @IsNotEmpty( { message: 'Campo valor procentaje es requerido.', } )
    @IsInt( { message: 'Campo valor procentaje solo permitido tipo ENTERO.', } )
    @Min(0, { message: 'Campo valor procentaje es requerido mínimo 0' } )
    @Type( () => Number )
    readonly valorporcentaje: number;

}
