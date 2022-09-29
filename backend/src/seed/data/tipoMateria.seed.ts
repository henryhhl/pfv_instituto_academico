
import { v4 as uuid } from 'uuid';
import { TipoMateria } from '../../tipomateria/entities/tipomateria.entity';

export const TIPOMATERIA_SEED: TipoMateria[] = [
    {
        idtipomateria: uuid(),
        sigla: 'TRO',
        descripcion: 'Troncal',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    {
        idtipomateria: uuid(),
        sigla: 'ELE',
        descripcion: 'Electiva',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    {
        idtipomateria: uuid(),
        sigla: 'ESP',
        descripcion: 'Especialidad',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
];
