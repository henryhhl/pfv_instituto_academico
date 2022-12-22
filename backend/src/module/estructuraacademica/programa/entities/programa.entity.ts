import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProgramaDivisionAcademicaDetalle } from './programadivisionacademicadetalle.entity';
import { InscripcionPrograma } from '../../../inscripcion/inscripcionprograma/entities/inscripcionprograma.entity';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';

@Entity('programa')
export class Programa {

    @PrimaryGeneratedColumn('uuid')
    idprograma: string;

    @OneToMany(
        () => InscripcionPrograma,
        ( inscripcionPrograma ) => inscripcionPrograma.programa,
    )
    arrayinscripcionprograma?: InscripcionPrograma[];

    @OneToMany(
        () => InscripcionGrupo,
        ( inscripcionGrupo ) => inscripcionGrupo.programa,
    )
    arrayinscripciongrupo?: InscripcionGrupo[];

    @OneToMany(
        () => ProgramaDivisionAcademicaDetalle,
        ( programaDivisionAcademicaDetalle ) => programaDivisionAcademicaDetalle.fkidprograma,
        { cascade: true, eager: true, },
    )
    arraydivisionacademica?: ProgramaDivisionAcademicaDetalle[];

    @Column('text')
    fkidunidadadministrativa: string;

    @Column('text')
    unidadadministrativa: string;

    @Column('text')
    fkidunidadnegocio: string;

    @Column('text')
    unidadnegocio: string;

    @Column('text')
    fkidunidadacademica: string;

    @Column('text')
    unidadacademica: string;

    @Column('text')
    fkidnivelacademico: string;

    @Column('text')
    nivelacademico: string;

    @Column('text')
    fkidmodalidadacademica: string;

    @Column('text')
    modalidadacademica: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    codigo: string;

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
