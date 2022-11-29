import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Grupo } from './grupo.entity';

@Entity('grupopensummateriadetalle')
export class GrupoPensumMateriaDetalle {

    @PrimaryGeneratedColumn()
    idgrupopensummateriadetalle: number;


    @ManyToOne(
        () => Grupo,
        (grupo) => grupo.arraygrupopensummateriadetalle,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidgrupo', })
    fkidgrupo: Grupo;


    @Column('text')
    fkidunidadadministrativa: string;

    @Column('text')
    unidadadministrativa: string;


    @Column('text')
    fkidunidadnegocio: string;

    @Column('text')
    unidadnegocio: string;


    @Column('text')
    fkidunidadacademica: string;

    @Column('text')
    unidadacademica: string;


    @Column('text')
    fkidprograma: string;

    @Column('text')
    programa: string;


    @Column('text')
    fkidpensum: string;

    @Column('text')
    pensum: string;


    @Column('text')
    fkiddocente: string;

    @Column('text')
    docente: string;


    @Column('text')
    fkidturno: string;

    @Column('text')
    turno: string;


    @Column('text')
    fkidgestionperiodo: string;

    @Column('text')
    gestionperiodo: string;


    @Column('text')
    fkidmateria: string;

    @Column('text')
    materia: string;


    @Column('text')
    fkiddivisionacademica: string;

    @Column('text')
    divisionacademica: string;

    @Column( {
        type: 'int',
        default: 0,
    })
    cupomaximo: number;

    @Column('text', { nullable: true, })
    fechacierre: string;

    @Column('text', { nullable: true, })
    fkidmotivoaperturacierrecurso: string;

    @Column('text', { nullable: true, })
    motivoaperturacierrecurso: string;

    @Column('text', { nullable: true, })
    observaciones: string;

    @Column( 'enum', {
        enum: ['A', 'C', 'N'],
        default: 'N',
    } )
    estadoproceso: string;


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