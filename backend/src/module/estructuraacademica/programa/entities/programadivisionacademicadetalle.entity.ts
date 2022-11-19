import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Programa } from './programa.entity';
import { ProgramaDivisionAcademicaMateriaDetalle } from './programadivisionacademicamateriadetalle.entity';

@Entity('programadivisionacademicadetalle')
export class ProgramaDivisionAcademicaDetalle {

    @PrimaryGeneratedColumn('uuid')
    idprogramadivisionacademicadetalle: string;

    @Column('text')
    fkiddivisionacademica: string;

    @Column('text')
    divisionacademica: string;

    @ManyToOne(
        ( ) => Programa,
        ( materia ) => materia.arraydivisionacademica,
        { onDelete: 'CASCADE', },
    )
    @JoinColumn({ name: 'fkidprograma', })
    fkidprograma: Programa;

    @OneToMany(
        () => ProgramaDivisionAcademicaMateriaDetalle,
        ( programaDivisionAcademicaMateriaDetalle ) => programaDivisionAcademicaMateriaDetalle.fkidprogramadivisionacademicadetalle,
        { cascade: true, eager: true, },
    )
    arraymateria?: ProgramaDivisionAcademicaMateriaDetalle[];

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