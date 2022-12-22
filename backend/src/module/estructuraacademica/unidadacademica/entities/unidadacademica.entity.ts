import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InscripcionCurso } from 'src/module/inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';
import { InscripcionPrograma } from '../../../inscripcion/inscripcionprograma/entities/inscripcionprograma.entity';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';

@Entity('unidadacademica')
export class UnidadAcademica {

    @PrimaryGeneratedColumn('uuid')
    idunidadacademica: string;


    @OneToMany(
        () => InscripcionPrograma,
        ( inscripcionPrograma ) => inscripcionPrograma.unidadacademica,
    )
    arrayinscripcionprograma?: InscripcionPrograma[];

    @OneToMany(
        () => InscripcionCurso,
        ( inscripcionCurso ) => inscripcionCurso.unidadacademica,
    )
    arrayinscripcioncurso?: InscripcionCurso[];

    @OneToMany(
        () => InscripcionGrupo,
        ( inscripcionGrupo ) => inscripcionGrupo.unidadacademica,
    )
    arrayinscripciongrupo?: InscripcionGrupo[];


    @Column('text')
    fkidunidadnegocio: string;

    @Column('text')
    unidadnegocio: string;

    @Column('text')
    fkidunidadadministrativa: string;

    @Column('text')
    unidadadministrativa: string;

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
