import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UnidadAdministrativa } from '../../../estructuraacademica/unidadadministrativa/entities/unidadadministrativa.entity';
import { GestionPeriodo } from '../../../estructurainstitucional/gestionperiodo/entities/gestionperiodo.entity';

@Entity('calendarioacademico')
export class CalendarioAcademico {

    @PrimaryGeneratedColumn( 'uuid' )
    idcalendarioacademico: string;

    @ManyToOne(
        ( ) => UnidadAdministrativa,
        ( item ) => item.arrayCalendarioAcademico,
    )
    @JoinColumn({ name: 'fkidunidadadministrativa', })
    unidadAdministrativa: UnidadAdministrativa;

    @ManyToOne(
        ( ) => GestionPeriodo,
        ( item ) => item.arrayCalendarioAcademico,
    )
    @JoinColumn({ name: 'fkidgestionperiodo', })
    gestionPeriodo: GestionPeriodo;

    @Column( 'text' )
    tipoactividad: string;

    @Column( 'text' )
    tipoferiado: string;

    @Column( 'text', {
        default: 'Si',
    } )
    existeclases: string;

    @Column( 'text' )
    fechanota: string;

    @Column( 'text' )
    nota: string;

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
