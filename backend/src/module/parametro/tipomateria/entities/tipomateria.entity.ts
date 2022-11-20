
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PensumDivisionAcademicaMateriaDetalle } from '../../../estructuraacademica/pensum/entities/pensumdivisionacademicamateriadetalle.entity';

@Entity('tipomateria')
export class TipoMateria {

    @PrimaryGeneratedColumn('uuid')
    idtipomateria: string;

    @OneToMany(
        () => PensumDivisionAcademicaMateriaDetalle,
        ( pensumDivisionAcademicaMateriaDetalle ) => pensumDivisionAcademicaMateriaDetalle.tipomateria,
    )
    pensumDivisionAcademicaMateriaDetalle?: PensumDivisionAcademicaMateriaDetalle[];

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
