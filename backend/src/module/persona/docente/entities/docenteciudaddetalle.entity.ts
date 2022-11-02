import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Docente } from './docente.entity';

@Entity('docentenacionalidaddetalle')
export class DocenteCiudadDetalle {

    @PrimaryGeneratedColumn('uuid')
    iddocenteciudaddetalle: string;

    @Column('text')
    fkidnacionalidad: string;

    @Column('text')
    nacionalidad: string;

    @ManyToOne(
        () => Docente,
        (docente) => docente.arraynacionalidad,
    )
    @JoinColumn({ name: 'fkiddocente', })
    fkiddocente: Docente;

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