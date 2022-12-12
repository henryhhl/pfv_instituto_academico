import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Negocio } from '../../negocio/entities/negocio.entity';

@Entity('actividad')
export class Actividad {

    @PrimaryGeneratedColumn( 'uuid' )
    idactividad: string;


    @Column( 'text', { nullable: true, } )
    fkidtipoactividad: string;

    @Column( 'text', { nullable: true, } )
    tipoactividad: string;


    @Column( 'text' )
    fkidasesorresponsable: string;

    @Column( 'text' )
    asesorresponsable: string;


    @Column( 'text', { nullable: true, } )
    fkidtiporesultado: string;

    @Column( 'text', { nullable: true, } )
    tiporesultado: string;


    @ManyToOne(
        ( ) => Negocio,
        ( negocio ) => negocio.arrayactividad,
    )
    @JoinColumn({ name: 'fkidnegocio', })
    negocio: Negocio;

    @Column( 'text', { nullable: true, } )
    descripcion: string;

    @Column( 'text', { nullable: true, } )
    nroactividad: string;


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
