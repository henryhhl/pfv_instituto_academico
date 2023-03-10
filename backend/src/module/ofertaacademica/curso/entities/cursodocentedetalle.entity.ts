import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Curso } from './curso.entity';
import { Docente } from '../../../persona/docente/entities/docente.entity';

@Entity('cursodocentedetalle')
export class CursoDocenteDetalle {

    @PrimaryGeneratedColumn()
    idcursodocentedetalle: number;

    @ManyToOne(
        () => Curso,
        (curso) => curso.arraydocente,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidcurso', })
    curso: Curso;

    @ManyToOne(
        ( ) => Docente,
        ( item ) => item.arrayCursoDocenteDetalle,
    )
    @JoinColumn({ name: 'fkiddocente', })
    docente: Docente;

    @Column('text', {
        nullable: true,
    } )
    contenido: string;

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