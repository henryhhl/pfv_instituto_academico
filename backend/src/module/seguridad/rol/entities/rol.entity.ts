import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AsignarRol } from '../../asignarrol/entities/asignarrol.entity';

@Entity()
export class Rol {

    @PrimaryGeneratedColumn('uuid')
    idrol: string;

    @OneToMany(
        () => AsignarRol,
        ( item ) => item.usuario,
    )
    arrayusuario?: AsignarRol[];

    @Column('text')
    fkidtiporol: string;

    @Column('text')
    tiporol: string;

    @Column( {
        type: 'text',
        unique: false,
    } )
    descripcion: string;

    @Column( {
        type: 'text',
        nullable: true,
    } )
    nota: string;

    @Column( {
        type: 'enum',
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( {
        type: 'int',
        default: 1,
    })
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
}
