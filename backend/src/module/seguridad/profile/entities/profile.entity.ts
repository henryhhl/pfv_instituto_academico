import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('profile')
export class Profile {

    @PrimaryGeneratedColumn('uuid')
    idprofile: string;

    @ManyToOne(
        ( ) => Usuario,
        ( usuario ) => usuario.profile,
        { onDelete: 'CASCADE', },
    )
    @JoinColumn({ name: 'fkidusuario', })
    usuario: Usuario;

    @Column( 'text', {
        nullable: true,
    } )
    fkidciudadorigen: string;

    @Column( 'text', {
        nullable: true,
    } )
    ciudadorigen: string;

    @Column( 'text', {
        nullable: true,
    } )
    direccion: string;

    @Column( 'text' )
    nombreprincipal: string;

    @Column( 'text', {
        nullable: true,
    } )
    nombreadicional: string;

    @Column( 'text', {
        nullable: true,
    } )
    apellidoprimero: string;

    @Column( 'text', {
        nullable: true,
    } )
    apellidosegundo: string;

    @Column( 'text', {
        nullable: true,
    } )
    email: string;

    @Column( 'text', {
        nullable: true,
    } )
    genero: string;

    @Column( 'text', {
        nullable: true,
    } )
    fechanacimiento: string;

    @Column( 'text', {
        nullable: true,
    } )
    telefonomobile: string;

    @Column( 'text', {
        nullable: true,
    } )
    imagen: string;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( 'numeric', {
        default: 1,
    } )
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
