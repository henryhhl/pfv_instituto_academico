import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrupoMateriaCalificacionDetalle } from 'src/module/ofertaacademica/grupo/entities/grupomateriacalificacion.entity';
import { CursoParametroCalificacion } from '../../../ofertaacademica/curso/entities/cursoparametrocalificacion.entity';
import { NotaCurso } from '../../notacurso/entities/notacurso.entity';
import { NotaGrupo } from '../../notagrupo/entities/notagrupo.entity';

@Entity('parametrocalificacion')
export class ParametroCalificacion {

    @PrimaryGeneratedColumn( 'uuid' )
    idparametrocalificacion: string;


    @OneToMany(
        () => NotaCurso,
        ( item ) => item.parametroCalificacion,
    )
    arrayNotaCurso?: NotaCurso[];

    @OneToMany(
        () => NotaGrupo,
        ( item ) => item.parametroCalificacion,
    )
    arrayNotaGrupo?: NotaGrupo[];


    @OneToMany(
        () => GrupoMateriaCalificacionDetalle,
        ( item ) => item.parametroCalificacion,
    )
    arrayGrupoMateriaCalificacionDetalle?: GrupoMateriaCalificacionDetalle[];

    @OneToMany(
        () => CursoParametroCalificacion,
        ( item ) => item.parametroCalificacion,
    )
    arrayCursoParametroCalificacion?: CursoParametroCalificacion[];

    @Column( 'text' )
    sigla: string;

    @Column( 'text' )
    descripcion: string;

    @Column( 'int', {
        default: 0,
    } )
    valorporcentaje: number;

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
