import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InscripcionCurso } from '../../../inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';
import { GrupoMateriaDetalle } from '../../../ofertaacademica/grupo/entities/grupomateriadetalle.entity';

@Entity('turno')
export class Turno {

    @PrimaryGeneratedColumn('uuid')
    idturno: string;

    @OneToMany(
        () => InscripcionCurso,
        ( inscripcionCurso ) => inscripcionCurso.turno,
    )
    arrayinscripcioncurso?: InscripcionCurso[];

    @OneToMany(
        () => GrupoMateriaDetalle,
        ( grupoPensumDetalle ) => grupoPensumDetalle.turno,
    )
    arrayGrupoPensumDetalle?: GrupoMateriaDetalle[];

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
