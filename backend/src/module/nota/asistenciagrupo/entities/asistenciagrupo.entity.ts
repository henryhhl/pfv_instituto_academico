import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';

@Entity('asistenciagrupo')
export class AsistenciaGrupo {

    @PrimaryGeneratedColumn( 'uuid' )
    idasistenciagrupo: string;

    @ManyToOne(
        ( ) => InscripcionGrupo,
        ( item ) => item.arrayAsistenciaGrupo,
    )
    @JoinColumn({ name: 'fkidinscripciongrupo', })
    inscripcionGrupo: InscripcionGrupo;

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
    nameday: string;

    @Column( 'int', {
        default: 1,
    } )
    day: number;

    @Column( 'int', {
        default: 1,
    } )
    mes: number;

    @Column( 'int', {
        default: 1,
    } )
    year: number;

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
