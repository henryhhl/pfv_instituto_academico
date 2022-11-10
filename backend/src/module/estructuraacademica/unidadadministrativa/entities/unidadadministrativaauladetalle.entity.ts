import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UnidadAdministrativa } from './unidadadministrativa.entity';

@Entity('unidadadministrativaauladetalle')
export class UnidadAdministrativaAulaDetalle {

    @PrimaryGeneratedColumn('uuid')
    idunidadadministrativaauladetalle: string;

    @Column('text')
    fkidaula: string;

    @Column('text')
    aula: string;

    @ManyToOne(
        () => UnidadAdministrativa,
        (unidadAdministrativa) => unidadAdministrativa.arrayaula,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'fkidunidadadministrativa', })
    fkidunidadadministrativa: UnidadAdministrativa;

    @Column( {
        type: 'int',
        default: 0,
    })
    cupo: number;

    @Column('text', { default: '', })
    nota: string;

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