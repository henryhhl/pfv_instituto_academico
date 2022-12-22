import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InscripcionCurso } from '../../../inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';
import { InscripcionPrograma } from '../../../inscripcion/inscripcionprograma/entities/inscripcionprograma.entity';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';

@Entity('gestionperiodo')
export class GestionPeriodo {

    @PrimaryGeneratedColumn('uuid')
    idgestionperiodo: string;

    @OneToMany(
        () => InscripcionPrograma,
        ( inscripcionPrograma ) => inscripcionPrograma.gestionperiodo,
    )
    arrayinscripcionprograma?: InscripcionPrograma[];

    @OneToMany(
        () => InscripcionCurso,
        ( inscripcionCurso ) => inscripcionCurso.gestionperiodo,
    )
    arrayinscripcioncurso?: InscripcionCurso[];

    @OneToMany(
        () => InscripcionGrupo,
        ( inscripcionGrupo ) => inscripcionGrupo.gestionperiodo,
    )
    arrayinscripciongrupo?: InscripcionGrupo[];

    @Column( {
        type: 'text',
        unique: false,
    } )
    descripcion: string;

    @Column( {
        type: 'int',
        default: 1,
    })
    orden?: number;

    @Column('text')
    fechainicio: string;

    @Column('text')
    fechafinal: string;

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
