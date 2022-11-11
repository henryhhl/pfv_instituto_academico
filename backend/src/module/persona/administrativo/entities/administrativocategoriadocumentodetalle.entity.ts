import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Administrativo } from './administrativo.entity';

@Entity('administrativocategoriadocumentodetalle')
export class AdministrativoCategoriaDocumentoDetalle {

    @PrimaryGeneratedColumn('uuid')
    idadministrativocategoriadocumentodetalle: string;

    @Column('text')
    fkidcategoriadocumento: string;

    @Column('text')
    categoriadocumento: string;

    @ManyToOne(
        () => Administrativo,
        (administrativo) => administrativo.arraycategoriadocumento,
        {
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'fkidadministrativo', })
    fkidadministrativo: Administrativo;

    @Column('text', { default: '', })
    descripcion: string;

    @Column('text', { default: '', })
    documento: string;

    @Column('text', { default: '', })
    extension?: string;

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