
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InscripcionPrograma } from '../../../inscripcion/inscripcionprograma/entities/inscripcionprograma.entity';
import { InscripcionCurso } from '../../../inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';
import { Curso } from '../../../ofertaacademica/curso/entities/curso.entity';

@Entity('modalidadacademica')
export class ModalidadAcademica {

    @PrimaryGeneratedColumn('uuid')
    idmodalidadacademica: string;

    @OneToMany(
        () => InscripcionPrograma,
        ( inscripcionPrograma ) => inscripcionPrograma.modalidadacademica,
    )
    arrayinscripcionprograma?: InscripcionPrograma[];

    @OneToMany(
        () => InscripcionCurso,
        ( inscripcionCurso ) => inscripcionCurso.modalidadacademica,
    )
    arrayinscripcioncurso?: InscripcionCurso[];

    @OneToMany(
        () => Curso,
        ( item ) => item.modalidadAcademica,
    )
    arrayCurso?: Curso[];

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
