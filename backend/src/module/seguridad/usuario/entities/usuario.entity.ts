import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Bitacora } from '../../bitacora/entities/bitacora.entity';

@Entity('usuario')
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    idusuario: string;

    @OneToMany(
        () => Bitacora,
        ( bitacora ) => bitacora.usuario,
        { cascade: true, },
    )
    arraybitacora?: Bitacora[];

    @ManyToOne(
        ( ) => Profile,
        ( profile ) => profile.usuario,
        { nullable: true, onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidprofile', })
    profile: Profile;

    @Column( 'text', {
        nullable: true,
        default: '',
    } )
    nombreprincipal: string;

    @Column( 'text' )
    email: string;

    @Column( 'text' )
    login: string;

    @Column( 'text' )
    password: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    web_token?: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    api_token?: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    movil_token?: string;

    @Column( {
        type: 'int',
        default: 0,
    } )
    intentos: number;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    timeout?: string;

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

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.nombreprincipal = this.nombreprincipal?.trim();
        this.email = this.email.toLocaleLowerCase().trim();
        this.login = this.login.trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.nombreprincipal = this.nombreprincipal?.trim();
        this.email = this.email.toLocaleLowerCase().trim();
        this.login = this.login.trim();
    }
}
