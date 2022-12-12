import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Oportunidad } from '../../oportunidad/entities/oportunidad.entity';
import { Actividad } from '../../actividad/entities/actividad.entity';

@Entity('negocio')
export class Negocio {

    @PrimaryGeneratedColumn( 'uuid' )
    idnegocio: string;


    @OneToMany(
        () => Actividad,
        ( actividad ) => actividad.negocio,
        { cascade: true, eager: true, }
    )
    arrayactividad?: Actividad[];


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


    @ManyToOne(
        ( ) => Oportunidad,
        ( oportunidad ) => oportunidad.arraynegocio,
        { eager: true, }
    )
    @JoinColumn({ name: 'fkidoportunidad', })
    oportunidad: Oportunidad;


    @Column( 'text', { nullable: true, } )
    descripcion?: string;

    @Column( 'text' )
    fechainicio: string;

    @Column( 'text' )
    fechacierre: string;

    @Column( 'text', {
        nullable: true,
    } )
    nota?: string;


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
