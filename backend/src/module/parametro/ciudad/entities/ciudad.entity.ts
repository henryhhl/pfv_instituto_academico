import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ciudad {

    @PrimaryGeneratedColumn('uuid')
    idciudad: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    fkidtipociudad: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    tipociudad: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    fkidciudadpadre?: string;

    @Column('text')
    sigla: string;

    @Column('text')
    descripcion: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    imagen?: string;

    @Column( {
        type: 'enum',
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( {
        type: 'int',
        default: 1,
    } )
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
