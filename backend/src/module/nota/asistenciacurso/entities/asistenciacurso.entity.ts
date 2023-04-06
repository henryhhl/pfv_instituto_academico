import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { InscripcionCurso } from '../../../inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';

@Entity('asistenciacurso')
export class AsistenciaCurso {

    @PrimaryGeneratedColumn( 'uuid' )
    idasistenciacurso: string;

    @ManyToOne(
        ( ) => InscripcionCurso,
        ( item ) => item.arrayAsistenciaCurso,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidinscripcioncurso', })
    inscripcionCurso: InscripcionCurso;

    @Column( 'enum', {
        enum: ['A', 'F', 'L', 'R', 'N'],
        default: 'N',
    } )
    asistencia: string;

    @Column( 'text', {
        nullable: true,
    } )
    observacion?: string;

    @Column( 'text' )
    fechaasistencia: string;

    @Column( 'text' )
    dayweekname: string;

    @Column( 'int', {
        default: 1,
    } )
    dayweek: number;


    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( 'int', {
        default: 1,
    } )
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
