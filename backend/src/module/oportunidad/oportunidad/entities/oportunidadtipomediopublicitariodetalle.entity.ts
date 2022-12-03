import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Oportunidad } from './oportunidad.entity';

@Entity('oportunidadtipomediopublicitariodetalle')
export class OportunidadTipoMedioPublicitarioDetalle {

    @PrimaryGeneratedColumn('uuid')
    idoportunidadtipomediopublicitariodetalle: string;

    @ManyToOne(
        ( ) => Oportunidad,
        (oportunidad) => oportunidad.arraytipomediopublicitario,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn( { name: 'fkidoportunidad', } )
    fkidoportunidad: Oportunidad;

    
    @Column('text')
    fkidtipomediopublicitario: string;

    @Column('text')
    tipomediopublicitario: string;


    @Column('text', { nullable: true, })
    detalle?: string;

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

    @Column('text')
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