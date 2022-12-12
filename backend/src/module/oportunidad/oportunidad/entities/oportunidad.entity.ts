import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Negocio } from '../../negocio/entities/negocio.entity';
import { OportunidadTipoContactoDetalle } from './oportunidadtipocontactodetalle.entity';
import { OportunidadTipoMedioPublicitarioDetalle } from './oportunidadtipomediopublicitariodetalle.entity';

@Entity('oportunidad')
export class Oportunidad {

    @PrimaryGeneratedColumn( 'uuid' )
    idoportunidad: string;

    @OneToMany(
        () => OportunidadTipoContactoDetalle,
        ( oportunidadTipoContacto ) => oportunidadTipoContacto.fkidoportunidad,
        { cascade: true, eager: true, },
    )
    arraytipocontacto?: OportunidadTipoContactoDetalle[];

    @OneToMany(
        () => OportunidadTipoMedioPublicitarioDetalle,
        ( oportunidadTipoMedioPublicitarioContacto ) => oportunidadTipoMedioPublicitarioContacto.fkidoportunidad,
        { cascade: true, eager: true, },
    )
    arraytipomediopublicitario?: OportunidadTipoMedioPublicitarioDetalle[];

    @OneToMany(
        () => Negocio,
        ( negocio ) => negocio.oportunidad,
        { cascade: true, }
    )
    arraynegocio?: Negocio[];

    @Column( 'text' )
    fkidciudadorigen: string;

    @Column( 'text' )
    ciudadorigen: string;


    @Column( 'text' )
    fkidasesorresponsable: string;

    @Column( 'text' )
    asesorresponsable: string;

    @Column( 'text' )
    descripcion: string;

    @Column( 'text' )
    identificacion: string;

    @Column( 'text' )
    celular: string;
    
    @Column( 'text' )
    email: string;

    @Column( 'text' )
    direccion: string;

    @Column( 'text' )
    barrio: string;

    @Column( 'text' )
    fecharegistro: string;

    @Column( 'text' )
    horaregistro: string;

    @Column( 'text', { nullable: true, } )
    nota: string;

    @Column( 'enum', {
        enum: ['A', 'N'],
        default: 'A',
    } )
    estado: string;

    @Column( 'int', {
        default: 1,
    })
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
