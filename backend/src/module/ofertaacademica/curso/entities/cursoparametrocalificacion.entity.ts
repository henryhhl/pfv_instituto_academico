import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ParametroCalificacion } from '../../../nota/parametrocalificacion/entities/parametrocalificacion.entity';
import { Curso } from './curso.entity';

@Entity('cursoparametrocalificacion')
export class CursoParametroCalificacion {

    @PrimaryGeneratedColumn('uuid')
    idcursoparametrocalificacion: string;


    @ManyToOne(
        () => Curso,
        (item) => item.arrayCursoParametroCalificacion,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidcurso', })
    curso: Curso;


    @ManyToOne(
        () => ParametroCalificacion,
        (item) => item.arrayCursoParametroCalificacion,
    )
    @JoinColumn({ name: 'fkidparametrocalificacion', })
    parametroCalificacion: ParametroCalificacion;


    @Column( 'int', {
        default: 0,
    } )
    valorporcentaje: number;


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

    @Column('text')
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
