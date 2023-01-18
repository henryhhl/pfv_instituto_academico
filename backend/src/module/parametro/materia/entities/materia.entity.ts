
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';
import { GrupoMateriaDetalle } from '../../../ofertaacademica/grupo/entities/grupomateriadetalle.entity';
import { PensumDivisionAcademicaMateriaDetalle } from '../../../estructuraacademica/pensum/entities/pensumdivisionacademicamateriadetalle.entity';

@Entity()
export class Materia {
    
    @PrimaryGeneratedColumn('uuid')
    idmateria: string;

    @OneToMany(
        () => InscripcionGrupo,
        ( inscripcionGrupo ) => inscripcionGrupo.pensum,
    )
    arrayinscripciongrupo?: InscripcionGrupo[];

    @OneToMany(
        () => PensumDivisionAcademicaMateriaDetalle,
        ( pensumDivisionAcademicaMateriaDetalle ) => pensumDivisionAcademicaMateriaDetalle.materia,
    )
    pensumDivisionAcademicaMateriaDetalle?: PensumDivisionAcademicaMateriaDetalle[];

    @OneToMany(
        () => GrupoMateriaDetalle,
        ( grupoPensumDetalle ) => grupoPensumDetalle.materia,
    )
    arrayGrupoPensumDetalle?: GrupoMateriaDetalle[];

    @Column( {
        type: 'text',
        unique: false,
    } )
    codigo: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    sigla: string;

    @Column('text')
    nombrelargo: string;

    @Column('text')
    nombrecorto: string;

    @Column('text')
    nombrealternativo: string;

    @Column('text')
    creditos: string;

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
