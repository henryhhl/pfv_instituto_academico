import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { UnidadAdministrativa } from '../../../estructuraacademica/unidadadministrativa/entities/unidadadministrativa.entity';
import { UnidadAcademica } from '../../../estructuraacademica/unidadacademica/entities/unidadacademica.entity';
import { UnidadNegocio } from '../../../parametro/unidadnegocio/entities/unidadnegocio.entity';
import { Curso } from '../../../ofertaacademica/curso/entities/curso.entity';
import { Estudiante } from '../../../persona/estudiante/entities/estudiante.entity';
import { GestionPeriodo } from '../../../estructurainstitucional/gestionperiodo/entities/gestionperiodo.entity';
import { Turno } from '../../../estructurainstitucional/turno/entities/turno.entity';
import { ModalidadAcademica } from '../../../parametro/modalidadacademica/entities/modalidadacademica.entity';

@Entity('inscripcioncurso')
export class InscripcionCurso {

    @PrimaryGeneratedColumn('uuid')
    idinscripcioncurso: string;

    @ManyToOne(
        ( ) => UnidadAdministrativa,
        ( unidadAdministrativa ) => unidadAdministrativa.arrayinscripcioncurso,
    )
    @JoinColumn({ name: 'fkidunidadadministrativa', })
    unidadadministrativa: UnidadAdministrativa;

    @ManyToOne(
        ( ) => UnidadAcademica,
        ( unidadAcademica ) => unidadAcademica.arrayinscripcioncurso,
    )
    @JoinColumn({ name: 'fkidunidadacademica', })
    unidadacademica: UnidadAcademica;

    @ManyToOne(
        ( ) => UnidadNegocio,
        ( unidadNegocio ) => unidadNegocio.arrayinscripcioncurso,
    )
    @JoinColumn({ name: 'fkidunidadnegocio', })
    unidadnegocio: UnidadNegocio;

    @ManyToOne(
        ( ) => Curso,
        ( curso ) => curso.arrayinscripcioncurso,
    )
    @JoinColumn({ name: 'fkidcurso', })
    curso: Curso;

    @ManyToOne(
        ( ) => Estudiante,
        ( estudiante ) => estudiante.arrayinscripcioncurso,
    )
    @JoinColumn({ name: 'fkidestudiante', })
    estudiante: Estudiante;

    @ManyToOne(
        ( ) => GestionPeriodo,
        ( gestionPeriodo ) => gestionPeriodo.arrayinscripcionprograma,
    )
    @JoinColumn({ name: 'fkidgestionperiodo', })
    gestionperiodo: GestionPeriodo;

    @ManyToOne(
        ( ) => Turno,
        ( turno ) => turno.arrayinscripcioncurso,
    )
    @JoinColumn({ name: 'fkidturno', })
    turno: Turno;

    @ManyToOne(
        ( ) => ModalidadAcademica,
        ( modalidadAcademica ) => modalidadAcademica.arrayinscripcioncurso,
    )
    @JoinColumn({ name: 'fkidmodalidadacademica', })
    modalidadacademica: ModalidadAcademica;

    @Column('text')
    fechainscripcion: string;

    @Column( 'enum', {
        enum: ['S', 'N'],
        default: 'S',
    } )
    esinscripcionformalizada: string;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'N',
    } )
    condicion: string;

    @Column( 'text', {
        nullable: true,
    } )
    nota?: string;

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
