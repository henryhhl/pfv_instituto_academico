import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrupoPensumMateriaDetalle } from './grupopensummateria.entity';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';

@Entity('grupo')
export class Grupo {

    @PrimaryGeneratedColumn( 'uuid' )
    idgrupo: string;

    @OneToMany(
        () => InscripcionGrupo,
        ( inscripcionGrupo ) => inscripcionGrupo.pensum,
    )
    arrayinscripciongrupo?: InscripcionGrupo[];

    @OneToMany(
        () => GrupoPensumMateriaDetalle,
        ( grupoPensumMateriaDetalle ) => grupoPensumMateriaDetalle.grupo,
        { cascade: true, },
    )
    arraygrupopensummateriadetalle?: GrupoPensumMateriaDetalle[];


    @Column( 'text', {
        unique: false,
    } )
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
