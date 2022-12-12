import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('grupopensummateriahorariodetalle')
export class GrupoPensumMateriaHorarioDetalle {

    @PrimaryGeneratedColumn()
    idgrupopensummateriahorariodetalle: number;

    @Column('text')
    horainicio: string;

    @Column('text')
    horafinal: string;

    @Column('text')
    dia: string;

    @Column('text')
    coddia: string;

    // horainicio: data.horainicio,
    // horafinal: data.horafinal,
    // aula: data.aula, arraydia
    // dia: detalle.descripcion,
    // coddia: detalle.codigo,

}