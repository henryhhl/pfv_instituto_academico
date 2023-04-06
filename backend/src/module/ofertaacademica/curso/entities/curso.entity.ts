import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CursoDocenteDetalle } from './cursodocentedetalle.entity';
import { InscripcionCurso } from '../../../inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';
import { UnidadNegocio } from '../../../parametro/unidadnegocio/entities/unidadnegocio.entity';
import { UnidadAdministrativa } from '../../../estructuraacademica/unidadadministrativa/entities/unidadadministrativa.entity';
import { UnidadAcademica } from '../../../estructuraacademica/unidadacademica/entities/unidadacademica.entity';
import { ModalidadAcademica } from '../../../parametro/modalidadacademica/entities/modalidadacademica.entity';
import { Turno } from '../../../estructurainstitucional/turno/entities/turno.entity';
import { Materia } from '../../../parametro/materia/entities/materia.entity';
import { GestionPeriodo } from '../../../estructurainstitucional/gestionperiodo/entities/gestionperiodo.entity';
import { MotivoAperturaCierreCurso } from '../../motivoaperturacierrecurso/entities/motivoaperturacierrecurso.entity';
import { Administrativo } from '../../../persona/administrativo/entities/administrativo.entity';
import { CursoHorarioDetalle } from './cursohorariodetalle.entity';
import { Aula } from '../../../estructurainstitucional/aula/entities/aula.entity';
import { CursoParametroCalificacion } from './cursoparametrocalificacion.entity';

@Entity('curso')
export class Curso {

    @PrimaryGeneratedColumn('uuid')
    idcurso: string;

    @OneToMany(
        () => CursoHorarioDetalle,
        ( item ) => item.curso,
        { cascade: true, },
    )
    arrayCursoHorarioDetalle?: CursoHorarioDetalle[];

    @OneToMany(
        () => CursoDocenteDetalle,
        ( cursoDocenteDetalle ) => cursoDocenteDetalle.curso,
        { cascade: true, },
    )
    arraydocente?: CursoDocenteDetalle[];

    @OneToMany(
        () => CursoParametroCalificacion,
        ( item ) => item.curso,
        { cascade: true, },
    )
    arrayCursoParametroCalificacion?: CursoParametroCalificacion[];

    @OneToMany(
        () => InscripcionCurso,
        ( inscripcionCurso ) => inscripcionCurso.curso,
        { cascade: true, },
    )
    arrayinscripcioncurso?: InscripcionCurso[];

    @ManyToOne(
        ( ) => UnidadNegocio,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidunidadnegocio', })
    unidadNegocio: UnidadNegocio;


    @ManyToOne(
        ( ) => UnidadAdministrativa,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidunidadadministrativa', })
    unidadAdministrativa: UnidadAdministrativa;


    @ManyToOne(
        ( ) => UnidadAcademica,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidunidadacademica', })
    unidadAcademica: UnidadAcademica;


    @ManyToOne(
        ( ) => ModalidadAcademica,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidmodalidadacademica', })
    modalidadAcademica: ModalidadAcademica;


    @ManyToOne(
        ( ) => Turno,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidturno', })
    turno: Turno;
    

    @ManyToOne(
        ( ) => Materia,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidmateria', })
    materia: Materia;


    @ManyToOne(
        ( ) => GestionPeriodo,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidgestionperiodo', })
    gestionPeriodo: GestionPeriodo;
    

    @ManyToOne(
        ( ) => Aula,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidaula', })
    aula: Aula;


    @Column( 'text', {
        unique: false,
    } )
    sigla: string;

    @Column( 'text' )
    descripcion: string;

    @Column( 'int', {
        default: 0,
    })
    cupo: number;

    @Column( 'text' )
    fechainicio: string;

    @Column( 'text' )
    fechafinal: string;

    @Column( 'text' )
    horainicio: string;

    @Column( 'text' )
    horafinal: string;

    @Column( {
        type: 'int',
        default: 1,
    })
    version: number;

    @Column( 'text', {
        default: '',
        nullable: true,
    } )
    prerequisito: string;

    @Column( 'text', {
        default: '',
        nullable: true,
    } )
    objetivo: string;

    @Column( {
        type: 'int',
        default: 0,
    })
    cantidadhora: number;

    @Column( {
        type: 'float',
        default: 0,
    })
    inversionbase: number;

    @ManyToOne(
        ( ) => MotivoAperturaCierreCurso,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidmotivoaperturacierrecurso', })
    motivoAperturaCierreCurso: MotivoAperturaCierreCurso;

    @ManyToOne(
        ( ) => Administrativo,
        ( item ) => item.arrayCurso,
    )
    @JoinColumn({ name: 'fkidadministrativo', })
    administrativo: Administrativo;


    @Column( 'text', { nullable: true, } )
    observaciones: string;

    @Column('text', { nullable: true, })
    fechaoperacion: string;


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

    @Column( {
        type: 'int',
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
