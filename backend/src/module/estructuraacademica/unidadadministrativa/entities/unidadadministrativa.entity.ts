import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UnidadAdministrativaTurnoDetalle } from './unidadadministrativaturnodetalle.entity';
import { UnidadAdministrativaAulaDetalle } from './unidadadministrativaauladetalle.entity';
import { InscripcionPrograma } from 'src/module/inscripcion/inscripcionprograma/entities/inscripcionprograma.entity';
import { InscripcionCurso } from 'src/module/inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';
import { InscripcionGrupo } from 'src/module/inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';

@Entity('unidadadministrativa')
export class UnidadAdministrativa {

    @PrimaryGeneratedColumn('uuid')
    idunidadadministrativa: string;

    @Column('text')
    fkidunidadnegocio: string;

    @Column('text')
    unidadnegocio: string;

    @OneToMany(
        () => UnidadAdministrativaTurnoDetalle,
        ( unidadadministrativaturnodetalle ) => unidadadministrativaturnodetalle.fkidunidadadministrativa,
        { cascade: true, eager: true, },
    )
    arrayturno?: UnidadAdministrativaTurnoDetalle[];

    @OneToMany(
        () => UnidadAdministrativaAulaDetalle,
        ( unidadadministrativaauladetalle ) => unidadadministrativaauladetalle.fkidunidadadministrativa,
        { cascade: true, eager: true, },
    )
    arrayaula?: UnidadAdministrativaAulaDetalle[];


    @OneToMany(
        () => InscripcionPrograma,
        ( inscripcionPrograma ) => inscripcionPrograma.unidadadministrativa,
    )
    arrayinscripcionprograma?: InscripcionPrograma[];

    @OneToMany(
        () => InscripcionCurso,
        ( inscripcionCurso ) => inscripcionCurso.unidadadministrativa,
    )
    arrayinscripcioncurso?: InscripcionCurso[];

    @OneToMany(
        () => InscripcionGrupo,
        ( inscripcionGrupo ) => inscripcionGrupo.unidadadministrativa,
    )
    arrayinscripciongrupo?: InscripcionGrupo[];

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
