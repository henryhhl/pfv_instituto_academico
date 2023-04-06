import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { InscripcionCurso } from '../../../inscripcion/inscripcioncurso/entities/inscripcioncurso.entity';
import { ParametroCalificacion } from '../../parametrocalificacion/entities/parametrocalificacion.entity';

@Entity('notacurso')
export class NotaCurso {

    @PrimaryGeneratedColumn( 'uuid' )
    idnotacurso: string;

    @ManyToOne(
        ( ) => InscripcionCurso,
        ( item ) => item.arrayNotaCurso,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidinscripcioncurso', })
    inscripcionCurso: InscripcionCurso;

    @ManyToOne(
        ( ) => ParametroCalificacion,
        ( item ) => item.arrayNotaCurso,
    )
    @JoinColumn({ name: 'fkidparametrocalificacion', })
    parametroCalificacion: ParametroCalificacion;

    @Column( 'text', {
        nullable: true,
    } )
    fkidcursoparametrocalificacion?: string;

    @Column( 'int', {
        default: 0,
    } )
    valorporcentaje: number;

    @Column( 'int', {
        default: 0,
    } )
    nota: number;

    @Column( 'int', {
        default: 0,
    } )
    calificacion: number;

    @Column( 'text', {
        nullable: true,
    } )
    observacion?: string;

    @Column( 'text', {
        nullable: true,
    } )
    fecharegistro?: string;

    @Column( 'text', {
        nullable: true,
    } )
    dayweekname?: string;

    @Column( 'int', {
        nullable: true,
    } )
    dayweek: number;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    estadoproceso: string;

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
