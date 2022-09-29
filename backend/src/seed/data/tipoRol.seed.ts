
import { v4 as uuid } from 'uuid'
import { TipoRol } from '../../tiporol/interfaces/tipoRol.interface';

export const TIPOROL_SEED: TipoRol[] = [
    {
        idtiporol: uuid(),
        descripcion: 'EsSuperAdmin',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    {
        idtiporol: uuid(),
        descripcion: 'EsAdmin',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
];