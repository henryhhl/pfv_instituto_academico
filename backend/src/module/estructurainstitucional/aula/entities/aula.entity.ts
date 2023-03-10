import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrupoMateriaDiaHorarioDetalle } from '../../../ofertaacademica/grupo/entities/grupomateriadiahorario.entity';
import { CursoHorarioDetalle } from '../../../ofertaacademica/curso/entities/cursohorariodetalle.entity';
import { Curso } from '../../../ofertaacademica/curso/entities/curso.entity';

@Entity('aula')
export class Aula {

    @PrimaryGeneratedColumn('uuid')
    idaula: string;

    @OneToMany(
        () => GrupoMateriaDiaHorarioDetalle,
        ( item ) => item.aula,
    )
    arrayGrupoMateriaDiaHorarioDetalle?: GrupoMateriaDiaHorarioDetalle[];

    @OneToMany(
        () => CursoHorarioDetalle,
        ( item ) => item.aula,
    )
    arrayCursoHorarioDetalle?: CursoHorarioDetalle[];

    @OneToMany(
        () => Curso,
        ( item ) => item.aula,
    )
    arrayCurso?: Curso[];

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
