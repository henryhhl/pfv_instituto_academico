import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('asesorresponsable')
export class AsesorResponsable {

    @PrimaryGeneratedColumn( 'uuid' )
    idasesorresponsable: string;


    @Column( 'text' )
    fkidtipoidentificacion: string;

    @Column( 'text' )
    tipoidentificacion: string;

    @Column( 'text' )
    numeroidentificacion: string;


    @Column( 'text' )
    fkidciudadnacimiento: string;

    @Column( 'text' )
    ciudadnacimiento: string;


    @Column( 'text' )
    fkidciudadresidencia: string;

    @Column( 'text' )
    ciudadresidencia: string;


    @Column( 'text' )
    nombreprincipal: string;

    @Column( 'text', { default: '', nullable: true, } )
    nombreadicional?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidoprimero?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidosegundo?: string;

    @Column( 'text' )
    comision: string;

    @Column( 'text' )
    valorporcentaje: number;

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

    @Column( 'text' )
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
