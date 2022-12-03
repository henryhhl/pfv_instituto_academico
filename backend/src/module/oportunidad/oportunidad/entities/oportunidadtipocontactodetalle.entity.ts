import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Oportunidad } from './oportunidad.entity';

@Entity('oportunidadtipocontactodetalle')
export class OportunidadTipoContactoDetalle {

    @PrimaryGeneratedColumn('uuid')
    idoportunidadtipocontactodetalle: string;

    @ManyToOne(
        ( ) => Oportunidad,
        (oportunidad) => oportunidad.arraytipocontacto,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn( { name: 'fkidoportunidad', } )
    fkidoportunidad: Oportunidad;

    
    @Column('text')
    fkidtipocontacto: string;

    @Column('text')
    tipocontacto: string;


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