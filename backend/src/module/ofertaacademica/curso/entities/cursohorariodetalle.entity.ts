import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Aula } from '../../../estructurainstitucional/aula/entities/aula.entity';
import { Curso } from './curso.entity';
import { CursoHorario } from './cursohorario.entity';

@Entity('cursohorariodetalle')
export class CursoHorarioDetalle {

    @PrimaryGeneratedColumn( 'uuid' )
    idcursohorariodetalle: string;

    @ManyToOne(
        ( ) => Curso,
        ( item ) => item.arrayCursoHorarioDetalle,
    )
    @JoinColumn({ name: 'fkidcurso', })
    curso: Curso;

    @ManyToOne(
        ( ) => CursoHorario,
        ( item ) => item.arrayCursoHorarioDetalle,
    )
    @JoinColumn({ name: 'fkidcursohorario', })
    cursoHorario: CursoHorario;

    @ManyToOne(
        ( ) => Aula,
        ( item ) => item.arrayCursoHorarioDetalle,
    )
    @JoinColumn({ name: 'fkidaula', })
    aula: Aula;

    @Column('text')
    horainicio: string;

    @Column('text')
    horafinal: string;

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
