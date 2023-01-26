import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Rol } from '../../rol/entities/rol.entity';

@Entity('asignarrol')
export class AsignarRol {

    @PrimaryGeneratedColumn('uuid')
    idasignarrol: string;

    @ManyToOne(
        ( ) => Usuario,
        ( item ) => item.arrayrol,
    )
    @JoinColumn({ name: 'fkidusuario', })
    usuario: Usuario;

    @ManyToOne(
        ( ) => Rol,
        ( item ) => item.arrayusuario,
    )
    @JoinColumn({ name: 'fkidrol', })
    rol: Rol;

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
