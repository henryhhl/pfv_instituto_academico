
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Materia {
    
    @PrimaryGeneratedColumn('uuid')
    idmateria: string;

    @Column('text')
    fkidtipomateria: string;

    @Column('text')
    tipomateria: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    codigo: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    sigla: string;

    @Column('text')
    nombrelargo: string;

    @Column('text')
    nombrecorto: string;

    @Column('text')
    nombrealternativo: string;

    @Column('text')
    creditos: string;

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
