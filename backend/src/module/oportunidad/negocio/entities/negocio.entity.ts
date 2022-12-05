import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('negocio')
export class Negocio {

    @PrimaryGeneratedColumn( 'uuid' )
    idnegocio: string;


    @Column( 'text' )
    fkidprograma: string;

    @Column( 'text' )
    programa: string;


    @Column( 'text' )
    fkidturno: string;

    @Column( 'text' )
    turno: string;


    @Column( 'text' )
    fkidestadonegocio: string;

    @Column( 'text' )
    estadonegocio: string;


    @Column( 'text', { nullable: true, } )
    fkidoportunidad?: string;

    @Column( 'text', { nullable: true, } )
    oportunidad?: string;

    @Column( 'text' )
    fechainicio: string;

    @Column( 'text' )
    fechacierre: string;


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
