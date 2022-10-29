import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gestionperiodo')
export class GestionPeriodo {

    @PrimaryGeneratedColumn('uuid')
    idgestionperiodo: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    descripcion: string;

    @Column( {
        type: 'int',
        default: 1,
    })
    orden?: number;

    @Column('text')
    fechainicio: string;

    @Column('text')
    fechafinal: string;

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
