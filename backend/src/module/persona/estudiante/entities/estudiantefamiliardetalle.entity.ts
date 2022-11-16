import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Estudiante } from './estudiante.entity';

@Entity('estudiantefamiliardetalle')
export class EstudianteFamiliarDetalle {

    @PrimaryGeneratedColumn('uuid')
    idestudiantefamiliardetalle: string;

    @ManyToOne(
        () => Estudiante,
        (estudiante) => estudiante.arrayfamiliar,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidestudiante', })
    fkidestudiante: Estudiante;

    @Column('text')
    fkidciudadnacimiento: string;

    @Column('text')
    ciudadnacimiento: string;

    @Column('text')
    fkidciudadresidencia: string;

    @Column('text')
    ciudadresidencia: string;

    @Column('text')
    fkidtipoidentificacion: string;

    @Column('text')
    tipoidentificacion: string;

    @Column('text')
    numeroidentificacion: string;

    @Column('text')
    nombreprincipal: string;

    @Column( 'text', { default: '', nullable: true, } )
    nombreadicional?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidoprimero?: string;

    @Column( 'text', { default: '', nullable: true, } )
    apellidosegundo?: string;

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

    @Column( 'text' )
    tiporelacion: string;

    @Column( 'text', { default: '', } )
    profesion?: string;

    @Column( 'enum', { enum: ['D', 'I', 'N'], default: 'N', } )
    tipoempleado?: string;

    @Column( 'text', { default: '', } )
    direccionempresa?: string;

    @Column( 'text', { default: '', } )
    fkidnivelacademico?: string;

    @Column( 'text', { default: '', } )
    nivelacademico?: string;

    @Column( 'text', { default: '', } )
    especialidad?: string;

    @Column( 'text', { default: '', } )
    tiposangre?: string;

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