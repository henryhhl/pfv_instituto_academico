
import { v4 as uuid } from 'uuid';
import { TipoPermiso } from '../../tipopermiso/interfaces/tipoPermiso.interface';

export const TIPOPERMISO_SEED: TipoPermiso[] = [
    {
        idtipopermiso: uuid(),
        descripcion: 'SubMenu',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    {
        idtipopermiso: uuid(),
        descripcion: 'Menu',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    {
        idtipopermiso: uuid(),
        descripcion: 'Button',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
];
