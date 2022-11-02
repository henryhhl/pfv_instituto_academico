import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DocenteReferenciaContactoDetalle } from './docentereferenciacontacto.entity';
import { DocenteCiudadDetalle } from './docenteciudaddetalle.entity';

@Entity('docente')
export class Docente {

    @PrimaryGeneratedColumn('uuid')
    iddocente: string;

    @Column( 'text' )
    fkidtipoidentificacion: string;

    @Column( 'text' )
    tipoidentificacion: string;

    @Column( 'text' )
    fkidciudadnacimiento: string;

    @Column( 'text' )
    ciudadnacimiento: string;

    @Column( 'text' )
    fkidciudadresidencia: string;

    @Column( 'text' )
    ciudadresidencia: string;

    @OneToMany(
        () => DocenteReferenciaContactoDetalle,
        ( docentereferenciacontactodetalle ) => docentereferenciacontactodetalle.fkiddocente,
        { cascade: true, },
    )
    arrayreferenciacontactos?: DocenteReferenciaContactoDetalle;

    @OneToMany(
        () => DocenteCiudadDetalle,
        ( docenteciudaddetalle ) => docenteciudaddetalle.fkiddocente,
        { cascade: true, },
    )
    arraynacionalidad?: DocenteCiudadDetalle;

    @Column( 'text' )
    nombreprincipal: string;

    @Column( 'text', { default: '', nullable: true, } )
    nombreadicional?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidopaterno?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidomaterno?: string;

    @Column( 'text' )
    numeroidentificacion: string;

    @Column( 'text' )
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
