
import { v4 as uuid } from 'uuid'
import { TipoRol } from '../../module/seguridad/tiporol/entities/tipoRol.entity';

export const TIPOROL_SEED: TipoRol[] = [
    {
        idtiporol: uuid(),
        descripcion: 'EsSuperAdmin',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
    },
    {
        idtiporol: uuid(),
        descripcion: 'EsAdmin',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
    },
];