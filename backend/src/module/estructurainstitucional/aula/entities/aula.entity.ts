import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrupoMateriaDiaHorarioDetalle } from '../../../ofertaacademica/grupo/entities/grupomateriadiahorario.entity';

@Entity('aula')
export class Aula {

    @PrimaryGeneratedColumn('uuid')
    idaula: string;

    @OneToMany(
        () => GrupoMateriaDiaHorarioDetalle,
        ( grupoMateriaDiaHorarioDetalle ) => grupoMateriaDiaHorarioDetalle.aula,
    )
    arrayGrupoMateriaDiaHorarioDetalle?: GrupoMateriaDiaHorarioDetalle[];

    @Column( {
        type: 'text',
        unique: false,
    } )
    sigla: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    descripcion: string;

    @Column( {
        type: 'enum',
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( {
        type: 'int',
        default: 1,
    })
    concurrencia: number;

    @Column( {
        type: 'enum',
        enum: ['A', 'N'],
        default: 'A',
    } )
    isdelete: string;

    @Column('text')
    created_at: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    updated_at?: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    deleted_at?: string;

}
