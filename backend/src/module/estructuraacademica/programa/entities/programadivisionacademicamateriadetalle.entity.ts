import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProgramaDivisionAcademicaDetalle } from './programadivisionacademicadetalle.entity';

@Entity('programadivisionacademicamateriadetalle')
export class ProgramaDivisionAcademicaMateriaDetalle {

    @PrimaryGeneratedColumn('uuid')
    idprogramadivisionacademicamateriadetalle: string;

    @ManyToOne(
        ( ) => ProgramaDivisionAcademicaDetalle,
        ( pragramaDivisionAcademicaMateria ) => pragramaDivisionAcademicaMateria.arraymateria,
        { onDelete: 'CASCADE', },
    )
    @JoinColumn({ name: 'fkidprogramadivisionacademicadetalle', })
    fkidprogramadivisionacademicadetalle: ProgramaDivisionAcademicaDetalle;

    @Column( {
        type: 'text',
    } )
    fkidmateria: string;

    @Column( {
        type: 'text',
    } )
    materia: string;

    @Column( {
        type: 'text',
    } )
    codmateria: string;

    @Column( {
        type: 'text',
    } )
    siglamateria: string;

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
