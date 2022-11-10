import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UnidadAdministrativa } from './unidadadministrativa.entity';

@Entity('unidadadministrativaturnodetalle')
export class UnidadAdministrativaTurnoDetalle {

    @PrimaryGeneratedColumn('uuid')
    idunidadadministrativaturnodetalle: string;

    @Column('text')
    fkidturno: string;

    @Column('text')
    turno: string;

    @ManyToOne(
        () => UnidadAdministrativa,
        (unidadAdministrativa) => unidadAdministrativa.arrayturno,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'fkidunidadadministrativa', })
    fkidunidadadministrativa: UnidadAdministrativa;

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