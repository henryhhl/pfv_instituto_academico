import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Administrativo } from './administrativo.entity';

@Entity('administrativonacionalidaddetalle')
export class AdministrativoNacionalidadDetalle {

    @PrimaryGeneratedColumn('uuid')
    idadministrativonacionalidaddetalle: string;

    @Column('text')
    fkidnacionalidad: string;

    @Column('text')
    nacionalidad: string;

    @ManyToOne(
        () => Administrativo,
        (administrativo) => administrativo.arraynacionalidad,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'fkidadministrativo', })
    fkidadministrativo: Administrativo;

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