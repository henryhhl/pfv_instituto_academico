import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    idusuario: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    email: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    login: string;

    @Column( 'text', {
        select: false,
    } )
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

    @Column( {
        type: 'enum',
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( {
        type: 'numeric',
        default: 1,
    } )
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

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLocaleLowerCase().trim();
        this.login = this.login.trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.email = this.email.toLocaleLowerCase().trim();
        this.login = this.login.trim();
    }
}
