import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CursoHorarioDetalle } from './cursohorariodetalle.entity';

@Entity('cursohorario')
export class CursoHorario {

    @PrimaryGeneratedColumn( 'uuid' )
    idcursohorario: string;

    @OneToMany(
        () => CursoHorarioDetalle,
        ( item ) => item.cursoHorario,
        { cascade: true, },
    )
    arrayCursoHorarioDetalle?: CursoHorarioDetalle[];

    @Column('text')
    fechahorario: string;

    @Column( 'int', {
        default: 1,
    })
    day: number;

    @Column( 'int', {
        default: 1,
    })
    month: number;

    @Column( 'int', {
        default: 1,
    })
    year: number;

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
