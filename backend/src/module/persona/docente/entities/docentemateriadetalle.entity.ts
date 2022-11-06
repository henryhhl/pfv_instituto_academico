import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Docente } from './docente.entity';

@Entity('docentemateriadetalle')
export class DocenteMateriaDetalle {

    @PrimaryGeneratedColumn('uuid')
    iddocentemateriadetalle: string;

    @Column('text')
    fkidmateria: string;

    @Column('text')
    materia: string;

    @ManyToOne(
        () => Docente,
        (docente) => docente.arraymateria,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'fkiddocente', })
    fkiddocente: Docente;

    @Column('text', { default: '', })
    tipoprioridad: string;

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