import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Administrativo } from './administrativo.entity';

@Entity('administrativoreferenciacontactodetalle')
export class AdministrativoReferenciaContactoDetalle {

    @PrimaryGeneratedColumn('uuid')
    idadministrativoreferenciacontactodetalle: string;

    @Column('text')
    fkidreferenciacontacto: string;

    @Column('text')
    referenciacontacto: string;

    @ManyToOne(
        () => Administrativo,
        (administrativo) => administrativo.arrayreferenciacontactos,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidadministrativo', })
    fkidadministrativo: Administrativo;

    @Column('text')
    detalle: string;

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