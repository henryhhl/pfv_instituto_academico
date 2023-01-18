import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GrupoMateriaDiaDetalle } from './grupomateriadiadetalle.entity';
import { Aula } from '../../../estructurainstitucional/aula/entities/aula.entity';

@Entity('grupomateriadiahorario')
export class GrupoMateriaDiaHorarioDetalle {

    @PrimaryGeneratedColumn()
    idgrupomateriadiahorario: number;

    @ManyToOne(
        () => GrupoMateriaDiaDetalle,
        (grupoMateriaDiaDetalle) => grupoMateriaDiaDetalle.arrayGrupoMateriaDiaHorario,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidgrupomateriadiadetalle', })
    grupoMateriaDiaDetalle: GrupoMateriaDiaDetalle;

    @ManyToOne(
        ( ) => Aula,
        ( aula ) => aula.arrayGrupoMateriaDiaHorarioDetalle,
    )
    @JoinColumn({ name: 'fkidaula', })
    aula: Aula;

    @Column('text')
    horainicio: string;

    @Column('text')
    horafinal: string;

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