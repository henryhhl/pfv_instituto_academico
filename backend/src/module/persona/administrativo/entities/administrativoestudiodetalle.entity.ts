import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Administrativo } from './administrativo.entity';

@Entity('administrativoestudiodetalle')
export class AdministrativoEstudioDetalle {

    @PrimaryGeneratedColumn('uuid')
    idadministrativoestudiodetalle: string;

    @Column('text')
    fkidinstitucion: string;

    @Column('text')
    institucion: string;

    @Column('text')
    fkidnivelacademico: string;

    @Column('text')
    nivelacademico: string;

    @ManyToOne(
        () => Administrativo,
        (docente) => docente.arrayestudio,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'fkidadministrativo', })
    fkidadministrativo: Administrativo;

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