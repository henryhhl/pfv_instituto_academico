import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('bitacora')
export class Bitacora {

    @PrimaryGeneratedColumn('uuid')
    idbitacora: string;

    @ManyToOne(
        ( ) => Usuario,
        ( usuario ) => usuario.arraybitacora,
    )
    @JoinColumn({ name: 'fkidusuario', })
    usuario: Usuario;

    @Column('text')
    fkidtabla: string;

    @Column('text')
    tabla: string;

    @Column('text', { default: '', })
    ip: string;

    @Column('text')
    uri: string;

    @Column('text')
    event: string;

    @Column('text')
    accion: string;

    @Column('text')
    descripcion: string;

    @Column('text')
    x_fecha: string;

    @Column('text')
    x_hora: string;

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
