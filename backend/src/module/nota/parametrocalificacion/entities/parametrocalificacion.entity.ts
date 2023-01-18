import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parametrocalificacion')
export class ParametroCalificacion {

    @PrimaryGeneratedColumn( 'uuid' )
    idparametrocalificacion: string;

    @Column( 'text' )
    sigla: string;

    @Column( 'text' )
    descripcion: string;

    @Column( 'int', {
        default: 0,
    } )
    valorporcentaje: number;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( 'int', {
        default: 1,
    } )
    concurrencia: number;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    isdelete: string;

    @Column( 'text' )
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
