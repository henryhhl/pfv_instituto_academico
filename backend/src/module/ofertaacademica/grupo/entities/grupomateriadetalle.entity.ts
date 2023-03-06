import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Grupo } from './grupo.entity';
import { GrupoMateriaDiaDetalle } from './grupomateriadiadetalle.entity';
import { Docente } from '../../../persona/docente/entities/docente.entity';
import { Materia } from '../../../parametro/materia/entities/materia.entity';
import { Pensum } from '../../../estructuraacademica/pensum/entities/pensum.entity';
import { Turno } from '../../../estructurainstitucional/turno/entities/turno.entity';
import { Programa } from '../../../estructuraacademica/programa/entities/programa.entity';
import { UnidadNegocio } from '../../../parametro/unidadnegocio/entities/unidadnegocio.entity';
import { UnidadAcademica } from '../../../estructuraacademica/unidadacademica/entities/unidadacademica.entity';
import { GestionPeriodo } from '../../../estructurainstitucional/gestionperiodo/entities/gestionperiodo.entity';
import { MotivoAperturaCierreCurso } from '../../motivoaperturacierrecurso/entities/motivoaperturacierrecurso.entity';
import { DivisionAcademica } from '../../../estructurainstitucional/divisionacademica/entities/divisionacademica.entity';
import { UnidadAdministrativa } from '../../../estructuraacademica/unidadadministrativa/entities/unidadadministrativa.entity';
import { GrupoMateriaCalificacionDetalle } from './grupomateriacalificacion.entity';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';

@Entity('grupomateriadetalle')
export class GrupoMateriaDetalle {

    @PrimaryGeneratedColumn()
    idgrupopensumdetalle: number;

    @OneToMany(
        () => InscripcionGrupo,
        ( item ) => item.grupoMateriaDetalle,
    )
    arrayInscripcionGrupo?: InscripcionGrupo[];

    @OneToMany(
        () => GrupoMateriaDiaDetalle,
        ( item ) => item.grupoMateriaDetalle,
        { cascade: true, },
    )
    arrayGrupoMateriaDiaDetalle?: GrupoMateriaDiaDetalle[];

    @OneToMany(
        () => GrupoMateriaCalificacionDetalle,
        ( item ) => item.grupoMateriaDetalle,
        { cascade: true, },
    )
    arrayGrupoMateriaCalificacionDetalle?: GrupoMateriaCalificacionDetalle[];

    @ManyToOne(
        () => Grupo,
        (grupo) => grupo.arrayGrupoMateriaDetalle,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidgrupo', })
    grupo: Grupo;
    

    @ManyToOne(
        ( ) => UnidadAdministrativa,
        ( unidadAdministrativa ) => unidadAdministrativa.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkidunidadadministrativa', })
    unidadAdministrativa: UnidadAdministrativa;
    

    @ManyToOne(
        ( ) => UnidadNegocio,
        ( unidadNegocio ) => unidadNegocio.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkidunidadnegocio', })
    unidadNegocio: UnidadNegocio;


    @ManyToOne(
        ( ) => UnidadAcademica,
        ( unidadAcademica ) => unidadAcademica.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkidunidadacademica', })
    unidadAcademica: UnidadAcademica;


    @ManyToOne(
        ( ) => Programa,
        ( programa ) => programa.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkidprograma', })
    programa: Programa;


    @ManyToOne(
        ( ) => Pensum,
        ( pensum ) => pensum.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkidpensum', })
    pensum: Pensum;


    @ManyToOne(
        ( ) => Docente,
        ( docente ) => docente.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkiddocente', })
    docente: Docente;

    @ManyToOne(
        ( ) => Turno,
        ( turno ) => turno.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkidturno', })
    turno: Turno;

    @ManyToOne(
        ( ) => GestionPeriodo,
        ( gestionperiodo ) => gestionperiodo.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkidgestionperiodo', })
    gestionPeriodo: GestionPeriodo;

    @ManyToOne(
        ( ) => Materia,
        ( materia ) => materia.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkidmateria', })
    materia: Materia;

    @ManyToOne(
        ( ) => DivisionAcademica,
        ( divisionacademica ) => divisionacademica.arrayGrupoPensumDetalle,
    )
    @JoinColumn({ name: 'fkiddivisionacademica', })
    divisionAcademica: DivisionAcademica;

    @ManyToOne(
        ( ) => MotivoAperturaCierreCurso,
        ( motivoaperturacierrecurso ) => motivoaperturacierrecurso.arrayGrupoPensumDetalle,
        { nullable: true, }
    )
    @JoinColumn({ name: 'fkidmotivoaperturacierrecurso', })
    motivoAperturaCierreCurso: MotivoAperturaCierreCurso;

    @Column( {
        type: 'int',
        default: 0,
    })
    cupomaximo: number;

    @Column('text', { nullable: true, })
    fechacierre: string;

    @Column('text', { nullable: true, })
    observaciones: string;

    @Column( 'enum', {
        enum: ['A', 'C', 'N'],
        default: 'N',
    } )
    estadoproceso: string;

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