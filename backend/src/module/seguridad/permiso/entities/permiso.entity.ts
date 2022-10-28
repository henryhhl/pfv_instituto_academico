import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Permiso {

    @PrimaryGeneratedColumn('uuid')
    idpermiso: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    fkidpermisopadre?: string;

    @Column('text')
    fkidtipopermiso: string;

    @Column('text')
    tipopermiso: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
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
