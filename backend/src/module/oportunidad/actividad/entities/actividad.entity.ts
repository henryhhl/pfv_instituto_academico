import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('actividad')
export class Actividad {

    @PrimaryGeneratedColumn( 'uuid' )
    idactividad: string;


    @Column( 'text' )
    fkidtipoactividad: string;

    @Column( 'text' )
    tipoactividad: string;


    @Column( 'text' )
    fkidasesorresponsable: string;

    @Column( 'text' )
    asesorresponsable: string;


    @Column( 'text' )
    fkidestadonegocio: string;

    @Column( 'text' )
    estadonegocio: string;


    @Column( 'text', {
        nullable: true,
    } )
    fkidnegocio: string;

    @Column( 'text', {
        nullable: true,
    } )
    negocio: string;


    @Column( 'text' )
    fechaprogramada: string;

    @Column( 'text' )
    horaprogramada: string;

    @Column( 'text', {
        nullable: true,
    } )
    nota: string;

    @Column( 'text', {
        nullable: true,
    } )
    fechacierre: string;

    @Column( 'text', {
        nullable: true,
    } )
    resultado: string;


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
