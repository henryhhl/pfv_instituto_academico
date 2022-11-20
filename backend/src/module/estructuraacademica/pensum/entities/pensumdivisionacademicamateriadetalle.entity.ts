import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Materia } from '../../../parametro/materia/entities/materia.entity';
import { TipoMateria } from '../../../parametro/tipomateria/entities/tipomateria.entity';
import { PensumDivisionAcademicaDetalle } from './pensumdivisionacademicadetalle.entity';

@Entity('pensumdivisionacademicamateriadetalle')
export class PensumDivisionAcademicaMateriaDetalle {

    @PrimaryGeneratedColumn('uuid')
    idpensumdivisionacademicamateriadetalle: string;

    @ManyToOne(
        ( ) => PensumDivisionAcademicaDetalle,
        ( pensumDivisionAcademicaMateria ) => pensumDivisionAcademicaMateria.arraymateria,
        { onDelete: 'CASCADE', },
    )
    @JoinColumn({ name: 'fkidpensumdivisionacademicadetalle', })
    fkidpensumdivisionacademicadetalle: PensumDivisionAcademicaDetalle;

    @ManyToOne(
        ( ) => Materia,
        ( materia ) => materia.pensumDivisionAcademicaMateriaDetalle,
        { eager: true, },
    )
    @JoinColumn({ name: 'fkidmateria', })
    materia: Materia;

    @ManyToOne(
        ( ) => TipoMateria,
        ( tipoMateria ) => tipoMateria.pensumDivisionAcademicaMateriaDetalle,
        { eager: true, },
    )
    @JoinColumn({ name: 'fkidtipomateria', })
    tipomateria: TipoMateria;

    @Column( {
        type: 'int',
        default: 1,
    })
    secuencia: number;

    @Column( {
        type: 'int',
        default: 0,
    })
    notaminima: number;

    @Column( {
        type: 'int',
        default: 0,
    })
    notamaxima: number;

    @Column( {
        type: 'int',
        default: 0,
    })
    horateorica: number;

    @Column( {
        type: 'int',
        default: 0,
    })
    horapractica: number;

    @Column( {
        type: 'int',
        default: 0,
    })
    horasociales: number;

    @Column( {
        type: 'int',
        default: 0,
    })
    cuporequerido: number;

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
