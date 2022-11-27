import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('grupo')
export class Grupo {

    @PrimaryGeneratedColumn( 'uuid' )
    idgrupo: string;

    @Column( 'text', {
        unique: false,
    } )
    sigla: string;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( 'int', {
        default: 1,
    })
    concurrencia: number;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    isdelete: string;

    @Column( 'text' )
    created_at: string;

    @Column( 'text', {
        nullable: true,
    } )
    updated_at?: string;

    @Column( 'text', {
        nullable: true,
    } )
    deleted_at?: string;

}
