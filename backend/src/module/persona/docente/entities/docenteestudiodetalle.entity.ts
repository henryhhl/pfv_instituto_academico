import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Docente } from './docente.entity';

@Entity('docenteestudiodetalle')
export class DocenteEstudioDetalle {

    @PrimaryGeneratedColumn('uuid')
    iddocenteestudiodetalle: string;

    @Column('text')
    fkidinstitucion: string;

    @Column('text')
    institucion: string;

    @Column('text')
    fkidnivelacademico: string;

    @Column('text')
    nivelacademico: string;

    @ManyToOne(
        () => Docente,
        (docente) => docente.arrayestudio,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'fkiddocente', })
    fkiddocente: Docente;

    @Column('text', { default: '', })
    descripcion: string;

    @Column( {
        type: 'enum',
        enum: ['S', 'N'],
        default: 'S',
    } )
    esgraduado: string;

    @Column( {
        type: 'int',
        default: 1,
    })
    ultimoyearcursado: number;

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