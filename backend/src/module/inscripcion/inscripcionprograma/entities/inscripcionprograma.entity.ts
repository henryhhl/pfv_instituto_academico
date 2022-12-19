import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Pensum } from '../../../estructuraacademica/pensum/entities/pensum.entity';
import { Programa } from '../../../estructuraacademica/programa/entities/programa.entity';
import { UnidadNegocio } from '../../../parametro/unidadnegocio/entities/unidadnegocio.entity';
import { ModalidadAcademica } from '../../../parametro/modalidadacademica/entities/modalidadacademica.entity';
import { UnidadAcademica } from '../../../estructuraacademica/unidadacademica/entities/unidadacademica.entity';
import { GestionPeriodo } from '../../../estructurainstitucional/gestionperiodo/entities/gestionperiodo.entity';
import { UnidadAdministrativa } from '../../../estructuraacademica/unidadadministrativa/entities/unidadadministrativa.entity';
import { Estudiante } from '../../../persona/estudiante/entities/estudiante.entity';

@Entity('inscripcionprograma')
export class InscripcionPrograma {

    @PrimaryGeneratedColumn('uuid')
    idinscripcionprograma: string;

    @ManyToOne(
        ( ) => UnidadAdministrativa,
        ( unidadAdministrativa ) => unidadAdministrativa.arrayinscripcionprograma,
    )
    @JoinColumn({ name: 'fkidunidadadministrativa', })
    unidadadministrativa: UnidadAdministrativa;

    @ManyToOne(
        ( ) => UnidadAcademica,
        ( unidadAcademica ) => unidadAcademica.arrayinscripcionprograma,
    )
    @JoinColumn({ name: 'fkidunidadacademica', })
    unidadacademica: UnidadAcademica;

    @ManyToOne(
        ( ) => UnidadNegocio,
        ( unidadNegocio ) => unidadNegocio.arrayinscripcionprograma,
    )
    @JoinColumn({ name: 'fkidunidadnegocio', })
    unidadnegocio: UnidadNegocio;

    @ManyToOne(
        ( ) => Programa,
        ( programa ) => programa.arrayinscripcionprograma,
    )
    @JoinColumn({ name: 'fkidprograma', })
    programa: Programa;

    @ManyToOne(
        ( ) => Pensum,
        ( pensum ) => pensum.arrayinscripcionprograma,
    )
    @JoinColumn({ name: 'fkidpensum', })
    pensum: Pensum;

    @ManyToOne(
        ( ) => Estudiante,
        ( estudiante ) => estudiante.arrayinscripcionprograma,
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
        ( ) => ModalidadAcademica,
        ( modalidadAcademica ) => modalidadAcademica.arrayinscripcionprograma,
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
