import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Docente } from './docente.entity';

@Entity('docentereferenciacontactodetalle')
export class DocenteReferenciaContactoDetalle {

    @PrimaryGeneratedColumn('uuid')
    iddocentereferenciacontactodetalle: string;

    @Column('text')
    fkidreferenciacontacto: string;

    @Column('text')
    referenciacontacto: string;

    @ManyToOne(
        () => Docente,
        (docente) => docente.arrayreferenciacontactos,
    )
    @JoinColumn({ name: 'fkiddocente', })
    fkiddocente: Docente;

    @Column('text')
    detalle: string;

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