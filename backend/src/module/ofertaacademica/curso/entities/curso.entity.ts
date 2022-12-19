import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CursoDocenteDetalle } from './cursodocentedetalle.entity';
import { InscripcionCurso } from '../../../inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';

@Entity('curso')
export class Curso {

    @PrimaryGeneratedColumn('uuid')
    idcurso: string;

    @OneToMany(
        () => CursoDocenteDetalle,
        ( cursoDocenteDetalle ) => cursoDocenteDetalle.fkidcurso,
        { cascade: true, },
    )
    arraydocente?: CursoDocenteDetalle[];

    @OneToMany(
        () => InscripcionCurso,
        ( inscripcionCurso ) => inscripcionCurso.curso,
    )
    arrayinscripcioncurso?: InscripcionCurso[];

    @Column('text')
    fkidunidadnegocio: string;

    @Column('text')
    unidadnegocio: string;

    @Column('text')
    fkidunidadadministrativa: string;

    @Column('text')
    unidadadministrativa: string;

    @Column('text')
    fkidunidadacademica: string;

    @Column('text')
    unidadacademica: string;


    @Column('text')
    fkidmodalidadacademica: string;

    @Column('text')
    modalidadacademica: string;


    @Column('text')
    fkidturno: string;

    @Column('text')
    turno: string;


    @Column('text')
    fkidmateria: string;

    @Column('text')
    materia: string;


    @Column('text' , {
        nullable: true,
    } )
    fkidgestionperiodo: string;

    @Column('text', {
        nullable: true,
    } )
    gestionperiodo: string;


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


    @Column( 'text', { nullable: true, } )
    fkidmotivoaperturacierrecurso: string;

    @Column( 'text', { nullable: true, } )
    motivoaperturacierrecurso: string;

    @Column( 'text', { nullable: true, } )
    fkidadministrativo: string;

    @Column( 'text', { nullable: true, } )
    administrativo: string;

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
