import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipoactividad')
export class TipoActividad {

    @PrimaryGeneratedColumn( 'uuid' )
    idtipoactividad: string;

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
