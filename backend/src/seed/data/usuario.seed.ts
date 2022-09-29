
import { v4 as uuid } from 'uuid'
import { Usuario } from '../../usuario/entities/usuario.entity';

export const USUARIO_SEED: Usuario[] = [
    {
        idusuario: uuid(),
        email: 'admin@gmail.com',
        login: 'admin',
        password: '123456',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    {
        idusuario: uuid(),
        email: 'prueba@gmail.com',
        login: 'prueba',
        password: '123456',
        estado: 'A',
        concurrencia: 1,
        isdelete: 'A',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
];