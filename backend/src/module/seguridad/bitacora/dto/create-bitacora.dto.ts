import { Usuario } from '../../usuario/entities/usuario.entity';

export class CreateBitacoraDto {

    readonly usuario: Usuario;

    readonly fkidtabla: string;

    readonly tabla: string;

    readonly ip: string;

    readonly uri: string;

    readonly event: string;

    readonly accion: string;

    readonly descripcion: string;

    readonly x_fecha: string;

    readonly x_hora: string;

}
