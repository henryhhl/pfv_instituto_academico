import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Grupo } from '../../../ofertaacademica/grupo/entities/grupo.entity';
import { Materia } from '../../../parametro/materia/entities/materia.entity';
import { Estudiante } from '../../../persona/estudiante/entities/estudiante.entity';
import { Pensum } from '../../../estructuraacademica/pensum/entities/pensum.entity';
import { Programa } from '../../../estructuraacademica/programa/entities/programa.entity';
import { UnidadNegocio } from '../../../parametro/unidadnegocio/entities/unidadnegocio.entity';
import { UnidadAcademica } from '../../../estructuraacademica/unidadacademica/entities/unidadacademica.entity';
import { GestionPeriodo } from '../../../estructurainstitucional/gestionperiodo/entities/gestionperiodo.entity';
import { UnidadAdministrativa } from '../../../estructuraacademica/unidadadministrativa/entities/unidadadministrativa.entity';

@Entity('inscripciongrupo')
export class InscripcionGrupo {

    @PrimaryGeneratedColumn('uuid')
    idinscripciongrupo: string;

    @ManyToOne(
        ( ) => UnidadAdministrativa,
        ( unidadAdministrativa ) => unidadAdministrativa.arrayinscripciongrupo,
    )
    @JoinColumn({ name: 'fkidunidadadministrativa', })
    unidadadministrativa: UnidadAdministrativa;

    @ManyToOne(
        ( ) => UnidadAcademica,
        ( unidadAcademica ) => unidadAcademica.arrayinscripciongrupo,
    )
    @JoinColumn({ name: 'fkidunidadacademica', })
    unidadacademica: UnidadAcademica;

    @ManyToOne(
        ( ) => UnidadNegocio,
        ( unidadNegocio ) => unidadNegocio.arrayinscripciongrupo,
    )
    @JoinColumn({ name: 'fkidunidadnegocio', })
    unidadnegocio: UnidadNegocio;

    @ManyToOne(
        ( ) => Estudiante,
        ( estudiante ) => estudiante.arrayinscripciongrupo,
    )
    @JoinColumn({ name: 'fkidestudiante', })
    estudiante: Estudiante;

    @ManyToOne(
        ( ) => GestionPeriodo,
        ( gestionPeriodo ) => gestionPeriodo.arrayinscripciongrupo,
    )
    @JoinColumn({ name: 'fkidgestionperiodo', })
    gestionperiodo: GestionPeriodo;

    @ManyToOne(
        ( ) => Programa,
        ( programa ) => programa.arrayinscripciongrupo,
    )
    @JoinColumn({ name: 'fkidprograma', })
    programa: Programa;

    @ManyToOne(
        ( ) => Pensum,
        ( pensum ) => pensum.arrayinscripciongrupo,
    )
    @JoinColumn({ name: 'fkidpensum', })
    pensum: Pensum;

    @ManyToOne(
        ( ) => Materia,
        ( materia ) => materia.arrayinscripciongrupo,
    )
    @JoinColumn({ name: 'fkidmateria', })
    materia: Materia;

    @ManyToOne(
        ( ) => Grupo,
        ( grupo ) => grupo.arrayinscripciongrupo,
    )
    @JoinColumn({ name: 'fkidgrupo', })
    grupo: Grupo;

    @Column('text')
    fechainscripcion: string;

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
