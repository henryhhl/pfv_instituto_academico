import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('institucion')
export class Institucion {

    @PrimaryGeneratedColumn('uuid')
    idinstitucion: string;

    @Column('text')
    fkidciudad: string;

    @Column('text')
    ciudad: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    sigla: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    descripcion: string;

    @Column('text')
    nit: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    telefono?: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    celular?: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    direccion?: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    email?: string;

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
