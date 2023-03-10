import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrupoMateriaDetalle } from '../../grupo/entities/grupomateriadetalle.entity';
import { Curso } from '../../curso/entities/curso.entity';

@Entity('motivoaperturacierrecurso')
export class MotivoAperturaCierreCurso {

    @PrimaryGeneratedColumn( 'uuid' )
    idmotivoaperturacierrecurso: string;

    @OneToMany(
        () => GrupoMateriaDetalle,
        ( grupoPensumDetalle ) => grupoPensumDetalle.motivoAperturaCierreCurso,
    )
    arrayGrupoPensumDetalle?: GrupoMateriaDetalle[];

    @OneToMany(
        () => Curso,
        ( item ) => item.motivoAperturaCierreCurso,
    )
    arrayCurso?: Curso[];

    @Column( 'text', {
        unique: false,
    } )
    sigla: string;

    @Column( 'text', {
        unique: false,
    } )
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
