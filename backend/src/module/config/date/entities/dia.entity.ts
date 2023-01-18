import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrupoMateriaDiaDetalle } from '../../../ofertaacademica/grupo/entities/grupomateriadiadetalle.entity';


@Entity('dia')
export class Dia {

    @PrimaryGeneratedColumn( 'uuid' )
    iddia: string;

    @OneToMany(
        () => GrupoMateriaDiaDetalle,
        ( grupoPensumDiaDetalle ) => grupoPensumDiaDetalle.dia,
    )
    arrayDia?: GrupoMateriaDiaDetalle[];

    @Column( 'text')
    sigla: string;

    @Column( 'text')
    descripcion: string;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( 'int', {
        default: 1,
    })
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