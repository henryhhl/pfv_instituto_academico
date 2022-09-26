import { Injectable } from '@nestjs/common';

@Injectable()
export class TipoRolService {
    private listTipoRol = [
        {
            idtiporol: 1,
            descripcion: 'SuperAdmin',
            estado: 'A',
            concurrencia: 1,
            isdelete: 'A',
            created_at: '',
            updated_at: '',
            deleted_at: '',
        },
        {
            idtiporol: 2,
            descripcion: 'Admin',
            estado: 'A',
            concurrencia: 1,
            isdelete: 'A',
            created_at: '',
            updated_at: '',
            deleted_at: '',
        },
    ];

    getAll() {
        return this.listTipoRol;
    }

    findTipoRolById( idtiporol:number ) {
        const tipoRol = this.listTipoRol.find( tipoRol => tipoRol.idtiporol === idtiporol );
        return tipoRol;
    }
}
