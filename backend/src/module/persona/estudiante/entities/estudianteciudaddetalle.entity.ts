import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Estudiante } from './estudiante.entity';

@Entity('estudiantenacionalidaddetalle')
export class EstudianteCiudadDetalle {

    @PrimaryGeneratedColumn('uuid')
    iddocenteciudaddetalle: string;

    @Column('text')
    fkidnacionalidad: string;

    @Column('text')
    nacionalidad: string;

    @ManyToOne(
        () => Estudiante,
        (estudiante) => estudiante.arraynacionalidad,
        { onDelete: 'CASCADE', }
    )
    @JoinColumn({ name: 'fkidestudiante', })
    fkidestudiante: Estudiante;

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