import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrupoMateriaDetalle } from './grupomateriadetalle.entity';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';

@Entity('grupo')
export class Grupo {

    @PrimaryGeneratedColumn( 'uuid' )
    idgrupo: string;

    @OneToMany(
        () => InscripcionGrupo,
        ( item ) => item.pensum,
    )
    arrayinscripciongrupo?: InscripcionGrupo[];

    @OneToMany(
        () => GrupoMateriaDetalle,
        ( item ) => item.grupo,
        { cascade: true, },
    )
    arrayGrupoMateriaDetalle?: GrupoMateriaDetalle[];


    @Column( 'text' )
    sigla: string;

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
