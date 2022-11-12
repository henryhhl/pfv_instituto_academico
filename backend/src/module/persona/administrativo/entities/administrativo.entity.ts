import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AdministrativoNacionalidadDetalle } from './administrativociudaddetalle.entity';
import { AdministrativoReferenciaContactoDetalle } from './administrativoreferenciacontacto.entity';
import { AdministrativoCategoriaDocumentoDetalle } from './administrativocategoriadocumentodetalle.entity';
import { AdministrativoEstudioDetalle } from './administrativoestudiodetalle.entity';

@Entity('administrativo')
export class Administrativo {

    @PrimaryGeneratedColumn('uuid')
    idadministrativo: string;

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
        () => AdministrativoReferenciaContactoDetalle,
        ( administrativoreferenciacontactodetalle ) => administrativoreferenciacontactodetalle.fkidadministrativo,
        { cascade: true, eager: true, },
    )
    arrayreferenciacontactos?: AdministrativoReferenciaContactoDetalle[];

    @OneToMany(
        () => AdministrativoNacionalidadDetalle,
        ( administrativonacionalidaddetalle ) => administrativonacionalidaddetalle.fkidadministrativo,
        { cascade: true, eager: true, },
    )
    arraynacionalidad?: AdministrativoNacionalidadDetalle[];

    @OneToMany(
        () => AdministrativoCategoriaDocumentoDetalle,
        ( administrativoCategoriaDocumentoDetalle ) => administrativoCategoriaDocumentoDetalle.fkidadministrativo,
        { cascade: true, eager: true, },
    )
    arraycategoriadocumento?: AdministrativoCategoriaDocumentoDetalle[];

    @OneToMany(
        () => AdministrativoEstudioDetalle,
        ( administrativoEstudioDetalle ) => administrativoEstudioDetalle.fkidadministrativo,
        { cascade: true, eager: true, },
    )
    arrayestudio?: AdministrativoEstudioDetalle[];

    @Column( 'text' )
    nombreprincipal: string;

    @Column( 'text', { default: '', nullable: true, } )
    nombreadicional?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidoprimero?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidosegundo?: string;

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
