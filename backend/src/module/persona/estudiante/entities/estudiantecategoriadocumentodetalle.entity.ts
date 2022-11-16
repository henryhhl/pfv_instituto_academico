import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Estudiante } from './estudiante.entity';

@Entity('estudiantecategoriadocumentodetalle')
export class EstudianteCategoriaDocumentoDetalle {

    @PrimaryGeneratedColumn('uuid')
    idestudiantecategoriadocumentodetalle: string;

    @Column('text')
    fkidcategoriadocumento: string;

    @Column('text')
    categoriadocumento: string;

    @ManyToOne(
        () => Estudiante,
        ( estudiante ) => estudiante.arraycategoriadocumento,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidestudiante', })
    fkidestudiante: Estudiante;

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