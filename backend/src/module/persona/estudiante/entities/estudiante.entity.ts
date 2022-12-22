import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EstudianteCiudadDetalle } from './estudianteciudaddetalle.entity';
import { EstudianteFamiliarDetalle } from './estudiantefamiliardetalle.entity';
import { EstudianteCategoriaDocumentoDetalle } from './estudiantecategoriadocumentodetalle.entity';
import { InscripcionCurso } from '../../../inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';
import { InscripcionPrograma } from '../../../inscripcion/inscripcionprograma/entities/inscripcionprograma.entity';

@Entity('estudiante')
export class Estudiante {

    @PrimaryGeneratedColumn('uuid')
    idestudiante: string;

    @OneToMany(
        () => InscripcionPrograma,
        ( inscripcionPrograma ) => inscripcionPrograma.estudiante,
    )
    arrayinscripcionprograma?: InscripcionPrograma[];

    @OneToMany(
        () => InscripcionCurso,
        ( inscripcionCurso ) => inscripcionCurso.estudiante,
    )
    arrayinscripcioncurso?: InscripcionCurso[];

    @OneToMany(
        () => InscripcionGrupo,
        ( inscripcionGrupo ) => inscripcionGrupo.estudiante,
    )
    arrayinscripciongrupo?: InscripcionGrupo[];

    @OneToMany(
        () => EstudianteCategoriaDocumentoDetalle,
        ( estudiantecategoriadocumentodetalle ) => estudiantecategoriadocumentodetalle.fkidestudiante,
        { cascade: true, eager: true, },
    )
    arraycategoriadocumento?: EstudianteCategoriaDocumentoDetalle[];

    @OneToMany(
        () => EstudianteCiudadDetalle,
        ( estudianteciudaddetalle ) => estudianteciudaddetalle.fkidestudiante,
        { cascade: true, eager: true, },
    )
    arraynacionalidad?: EstudianteCiudadDetalle[];

    @OneToMany(
        () => EstudianteFamiliarDetalle,
        ( estudiantefamiliardetalle ) => estudiantefamiliardetalle.fkidestudiante,
        { cascade: true, eager: true, },
    )
    arrayfamiliar?: EstudianteFamiliarDetalle[];

    @Column('text')
    fkidtipoidentificacion: string;

    @Column('text')
    tipoidentificacion: string;

    @Column('text')
    fkidciudadnacimiento: string;

    @Column('text')
    ciudadnacimiento: string;

    @Column('text')
    fkidciudadresidencia: string;

    @Column('text')
    ciudadresidencia: string;

    @Column('text', { default: '', })
    numeroregistro: string;

    @Column('text')
    nombreprincipal: string;

    @Column( 'text', { default: '', nullable: true, } )
    nombreadicional?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidoprimero?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidosegundo?: string;

    @Column('text')
    numeroidentificacion: string;

    @Column('text')
    genero: string;

    @Column( 'text', { nullable: true, default: '', } )
    email?: string;

    @Column( 'text', { nullable: true, default: '', } )
    telefono?: string;

    @Column( 'text', { nullable: true, default: '', } )
    celular?: string;

    @Column( 'text', { nullable: true, default: '', } )
    fechanacimiento?: string;

    @Column( 'text', { nullable: true, default: '', } )
    direccion?: string;

    @Column( 'text', { nullable: true, default: '', } )
    uv?: string;

    @Column( 'text', { nullable: true, default: '', } )
    manzano?: string;

    @Column( 'text', { nullable: true, default: '', } )
    barrio?: string;

    @Column( 'text' )
    estadocivil: string;

    @Column( 'text', { nullable: true, default: '', } )
    imagen?: string;

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
