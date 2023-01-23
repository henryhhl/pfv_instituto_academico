import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrupoMateriaCalificacionDetalle } from 'src/module/ofertaacademica/grupo/entities/grupomateriacalificacion.entity';

@Entity('parametrocalificacion')
export class ParametroCalificacion {

    @PrimaryGeneratedColumn( 'uuid' )
    idparametrocalificacion: string;

    @OneToMany(
        () => GrupoMateriaCalificacionDetalle,
        ( item ) => item.parametroCalificacion,
    )
    arrayGrupoMateriaCalificacionDetalle?: GrupoMateriaCalificacionDetalle[];

    @Column( 'text' )
    sigla: string;

    @Column( 'text' )
    descripcion: string;

    @Column( 'int', {
        default: 0,
    } )
    valorporcentaje: number;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( 'int', {
        default: 1,
    } )
    concurrencia: number;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    isdelete: string;

    @Column( 'text' )
    created_at: string;

    @Column( 'text', {
        nullable: true,
    } )
    updated_at?: string;

    @Column( 'text', {
        nullable: true,
    } )
    deleted_at?: string;
    
}
