import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GrupoMateriaDetalle } from './grupomateriadetalle.entity';
import { ParametroCalificacion } from '../../../nota/parametrocalificacion/entities/parametrocalificacion.entity';

@Entity('grupomateriacalificaciondetalle')
export class GrupoMateriaCalificacionDetalle {

    @PrimaryGeneratedColumn('uuid')
    idgrupomateriacalificaciondetalle: string;

    @ManyToOne(
        () => GrupoMateriaDetalle,
        (item) => item.arrayGrupoMateriaCalificacionDetalle,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidgrupomateriadetalle', })
    grupoMateriaDetalle: GrupoMateriaDetalle;

    @ManyToOne(
        () => ParametroCalificacion,
        (item) => item.arrayGrupoMateriaCalificacionDetalle,
    )
    @JoinColumn({ name: 'fkidparametrocalificacion', })
    parametroCalificacion: ParametroCalificacion;

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
    })
    concurrencia: number;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    isdelete: string;

    @Column('text')
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