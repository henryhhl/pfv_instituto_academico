import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';
import { ParametroCalificacion } from '../../parametrocalificacion/entities/parametrocalificacion.entity';

@Entity('notagrupo')
export class NotaGrupo {

    @PrimaryGeneratedColumn('uuid')
    idnotagrupo: string;

    @ManyToOne(
        ( ) => InscripcionGrupo,
        ( item ) => item.arrayNotaGrupo,
    )
    @JoinColumn({ name: 'fkidinscripciongrupo', })
    inscripcionGrupo: InscripcionGrupo;

    @ManyToOne(
        ( ) => ParametroCalificacion,
        ( item ) => item.arrayNotaGrupo,
    )
    @JoinColumn({ name: 'fkidparametrocalificacion', })
    parametroCalificacion: ParametroCalificacion;

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
