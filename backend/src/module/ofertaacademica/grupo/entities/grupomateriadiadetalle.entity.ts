import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Dia } from '../../../config/date/entities/dia.entity';
import { GrupoMateriaDetalle } from './grupomateriadetalle.entity';
import { GrupoMateriaDiaHorarioDetalle } from './grupomateriadiahorario.entity';

@Entity('grupomateriadiadetalle')
export class GrupoMateriaDiaDetalle {

    @PrimaryGeneratedColumn('uuid')
    idgrupomateriadiadetalle: string;

    @OneToMany(
        () => GrupoMateriaDiaHorarioDetalle,
        ( item ) => item.grupoMateriaDiaDetalle,
        { cascade: true, },
    )
    arrayGrupoMateriaDiaHorario?: GrupoMateriaDiaHorarioDetalle[];

    @ManyToOne(
        () => GrupoMateriaDetalle,
        (grupoMateriaDiaDetalle) => grupoMateriaDiaDetalle.arrayGrupoMateriaDiaDetalle,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidgrupopensumdetalle', })
    grupoMateriaDetalle: GrupoMateriaDetalle;

    @ManyToOne(
        () => Dia,
        (dia) => dia.arrayDia,
    )
    @JoinColumn({ name: 'fkiddia', })
    dia: Dia;

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