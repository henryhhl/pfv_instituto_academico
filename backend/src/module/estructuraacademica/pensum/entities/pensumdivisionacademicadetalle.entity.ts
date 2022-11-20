import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Pensum } from './pensum.entity';
import { PensumDivisionAcademicaMateriaDetalle } from './pensumdivisionacademicamateriadetalle.entity';
import { DivisionAcademica } from '../../../estructurainstitucional/divisionacademica/entities/divisionacademica.entity';

@Entity('pensumdivisionacademicadetalle')
export class PensumDivisionAcademicaDetalle {

    @PrimaryGeneratedColumn('uuid')
    idpensumdivisionacademicadetalle: string;

    @ManyToOne(
        ( ) => DivisionAcademica,
        ( divisionAcademica ) => divisionAcademica.pensumDivisionAcademicaMateriaDetalle,
        { eager: true, },
    )
    @JoinColumn({ name: 'fkiddivisionacademica', })
    divisionacademica: DivisionAcademica;

    @ManyToOne(
        ( ) => Pensum,
        ( pensum ) => pensum.arraydivisionacademica,
        { onDelete: 'CASCADE', },
    )
    @JoinColumn({ name: 'fkidpensum', })
    fkidpensum: Pensum;

    @OneToMany(
        () => PensumDivisionAcademicaMateriaDetalle,
        ( pensumDivisionAcademicaMateriaDetalle ) => pensumDivisionAcademicaMateriaDetalle.fkidpensumdivisionacademicadetalle,
        { cascade: true, eager: true, },
    )
    arraymateria?: PensumDivisionAcademicaMateriaDetalle[];

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