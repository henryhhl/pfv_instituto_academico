import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, OneToMany } from 'typeorm';
import { PensumDivisionAcademicaDetalle } from './pensumdivisionacademicadetalle.entity';
import { InscripcionGrupo } from '../../../inscripcion/inscripciongrupo/entities/inscripciongrupo.entity';
import { GrupoMateriaDetalle } from '../../../ofertaacademica/grupo/entities/grupomateriadetalle.entity';
import { InscripcionPrograma } from '../../../inscripcion/inscripcionprograma/entities/inscripcionprograma.entity';

@Entity('pensum')
export class Pensum {

    @PrimaryGeneratedColumn('uuid')
    idpensum: string;

    @OneToMany(
        () => InscripcionPrograma,
        ( inscripcionPrograma ) => inscripcionPrograma.pensum,
    )
    arrayinscripcionprograma?: InscripcionPrograma[];

    @OneToMany(
        () => InscripcionGrupo,
        ( inscripcionGrupo ) => inscripcionGrupo.pensum,
    )
    arrayinscripciongrupo?: InscripcionGrupo[];

    @OneToMany(
        () => GrupoMateriaDetalle,
        ( grupoPensumDetalle ) => grupoPensumDetalle.pensum,
    )
    arrayGrupoPensumDetalle?: GrupoMateriaDetalle[];

    @OneToMany(
        () => PensumDivisionAcademicaDetalle,
        ( pensumDivisionAcademicaDetalle ) => pensumDivisionAcademicaDetalle.fkidpensum,
        { cascade: true, eager: true, },
    )
    arraydivisionacademica?: PensumDivisionAcademicaDetalle[];


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


    @Column( {
        type: 'text',
        unique: false,
    } )
    descripcion: string;

    @Column('text')
    fechaaprobacion: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    nota?: string;

    @Column('text')
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

    // @BeforeUpdate()
    // update() {
    //     this.concurrencia = this.concurrencia + 1;
    // }
}
