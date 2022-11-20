import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PensumDivisionAcademicaDetalle } from '../../../estructuraacademica/pensum/entities/pensumdivisionacademicadetalle.entity';

@Entity('divisionacademica')
export class DivisionAcademica {

    @PrimaryGeneratedColumn('uuid')
    iddivisionacademica: string;

    @OneToMany(
        () => PensumDivisionAcademicaDetalle,
        ( pensumDivisionAcademicaDetalle ) => pensumDivisionAcademicaDetalle.divisionacademica,
    )
    pensumDivisionAcademicaMateriaDetalle?: PensumDivisionAcademicaDetalle[];

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
        type: 'int',
        default: 0,
    })
    orden: number;

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
